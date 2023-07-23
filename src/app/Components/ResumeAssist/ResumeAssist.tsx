import React from "react";
import styles from "./ResumeAssist.module.scss";
import BulletList from "../BulletList/BulletList";
import KeywordSummary from "../KeywordSummary/KeywordSummary";
import {createKeywordsRegEx, getAliases, getInstancedKeywords} from "@/app/utils";
import {useImmer} from "use-immer";
import {enableMapSet} from "immer";
import {Prisma, bulletRestriction} from "@prisma/client";
enableMapSet();

// Database structure
type SectionData = Prisma.resumeSectionGetPayload<{
  include: {
    positions: {
      include: {
        bullets: {
          include: {
            restrictions: true;
          };
        };
      };
    };
  };
}>[];
// Database structure
type PositionData = Prisma.positionGetPayload<{
  include: {
    bullets: {
      include: {
        restrictions: true;
      };
    };
  };
}>;
// Database structure
type BulletData = Prisma.bulletGetPayload<{
  include: {
    restrictions: true;
  };
}>;

interface Keyword {
  displayName: string;
  instances: number;
  proficient: boolean;
  aliases: string[];
}
interface Bullet {
  ID: number;
  /** The text that will be displayed. */
  bullet: string;
  /** Determines if this bullet will always appear / be inserted into the list regardless of any filters. */
  required?: boolean;
  /** Determines if this bullet can be used to fill out a section if its lacking. */
  fill?: boolean;
  /** A filter that controls if the bullet is allowed to be shown. Checks the list for keywords that must be present before allowing it to appear. False means no filter, True means all keywords found must exist. */
  restrict?: string[] | boolean;
}
export interface ResumeAssistProps {
  /** The keywords used to determine which skills & bullets to display. */
  keywords: Keyword[];
  /** All the data required to render a resumes sections (education, experience, etc), its positions, and their individual bullets. */
  sectionData: SectionData;
}
/** Renders a resume look-a-like that helps with tailoring your resume towards a job description.
 *
 * Automatically chooses bullet points based off the keywords found in the job description and creates a summary of the skills / keywords found in all displayed bullet points.
 */
function ResumeAssist({keywords, sectionData}: ResumeAssistProps) {
  const [overrides, setOverrides] = useImmer<Map<number, boolean>>(new Map());
  const activeBullets: string[] = [];
  const resumeSections = createSections(sectionData);

  /** Compares each restriction against the keywords passed in to confirm that the keywords include each restriction.
   *
   * This is to confirm that the job description has each keyword the user deems necessary for a bullet to be rendered.
   */
  function compareRestrictions(restrict: bulletRestriction[]) {
    const restrictions = restrict.map(({restriction}) => restriction);
    const instancedKeywords = getInstancedKeywords(keywords);

    if (restrict.length > 0) {
      // For each restriction, search the instancedKeywords for the first match.
      return restrictions.every((word) => instancedKeywords.some((obj) => obj.displayName === word));
    } else {
      // No restrictions, so it passes by default.
      return true;
    }
  }

  /** Creates the React elements necessary to display each section stored in the database in a readable resume-like format. */
  function createSections(sections: SectionData) {
    return sections.map(({title, positions}) => {
      const positionElems = createSectionPositions(positions);
      if (positionElems.length === 0) return <></>;
      return (
        <section key={title}>
          <h2>{title}</h2>
          {positionElems}
        </section>
      );
    });
  }

  /** Creates the React elements necessary to display each position for a given section in a readable resume-like format. */
  function createSectionPositions(positions: PositionData[]) {
    return positions.map(({id, title, subTitle, startDate, endDate, bullets}) => {
      const bulletElems = createPositionBullets(bullets);
      return (
        <section key={id} className={styles.history}>
          <div className={styles.position}>
            <h3>{title}</h3>
            {`${startDate.getFullYear()} - ${endDate?.getFullYear() ?? "present"}`}
          </div>
          <i>{subTitle}</i>

          {bulletElems}
        </section>
      );
    });
  }

  /** Filters bullets into two groups, enabled / disabled, then creates a list of those bullets. */
  function createPositionBullets(bullets: BulletData[]) {
    const instancedKeywords = getInstancedKeywords(keywords);
    const aliases = getAliases(instancedKeywords);
    const enabledBullets: Bullet[] = [];
    const disabledBullets: Bullet[] = [];
    const autofillBullets: Bullet[] = [];

    // groups the bullets into one of the following: enabled | disabled | autofill.
    for (const {id, point, required, fill, restrictions} of bullets) {
      const regEx = createKeywordsRegEx(aliases);
      const override = overrides.get(id);

      // Decide if the bullet should be enabled, disabled, or used to autofill.
      if (override === true) {
        // user enabled bullet
        enabledBullets.push({ID: id, bullet: point});
      } else if (override === false) {
        // user disabled bullet
        disabledBullets.push({ID: id, bullet: point});
      } else if (required === true) {
        // bullet is required by default
        enabledBullets.push({ID: id, bullet: point});
      } else if (regEx.test(point)) {
        // bullet contains any of the keywords
        if (compareRestrictions(restrictions)) {
          enabledBullets.push({ID: id, bullet: point});
        } else {
          disabledBullets.push({ID: id, bullet: point});
        }
      } else if (fill === true) {
        // bullet can be used as filler
        autofillBullets.push({ID: id, bullet: point});
      } else {
        disabledBullets.push({ID: id, bullet: point});
      }
    }

    // fills the enabledBullets list with the autofillBullets until a certain length is reached, then adds the remaining to the disabledBullets list.
    for (const bullet of autofillBullets) {
      if (enabledBullets.length < 4) {
        enabledBullets.push(bullet);
      } else if (enabledBullets.length >= 4) {
        disabledBullets.push(bullet);
      }
    }

    // save each enabled bullet to a global array for later use.
    for (const {bullet} of enabledBullets) activeBullets.push(bullet);

    return <BulletList enabledBullets={enabledBullets} disabledBullets={disabledBullets} onOverride={handleOverride} />;
  }

  /** Handle the user forcibly enabling / disabling a bullet. */
  function handleOverride(ID: number, state: boolean) {
    setOverrides((draft) => {
      draft.set(ID, state);
    });
  }

  function resetOverride() {
    setOverrides(new Map());
  }

  // Get the name of all keywords that the job requests, and the user is proficient in.
  const primaryKeywords = keywords.reduce<string[]>((accumulator, {displayName, instances, proficient}) => {
    if (instances > 0 && proficient) {
      accumulator.push(displayName);
    }
    return accumulator;
  }, []);

  // Get the name of all the keywords that are present in each enabled bullet.
  // const bulletMatches = getUniqueMatches(activeBullets.join(" "), getAliases(keywords));
  const bulletMatches = keywords.reduce<string[]>((accumulator, {displayName, aliases}) => {
    const text = activeBullets.join(" ");
    const regEx = createKeywordsRegEx(aliases);

    if (regEx.test(text)) {
      accumulator.push(displayName);
    }

    return accumulator;
  }, []);

  // Get the keywords that are not requested by the job description but are in the enabled bullets.
  const secondaryKeywords = bulletMatches.filter((val) => !primaryKeywords.includes(val));

  return (
    <section className={styles.container}>
      <h2>Skills</h2>
      <KeywordSummary
        keywords={[
          {keywords: primaryKeywords, color: "green"},
          {keywords: secondaryKeywords, color: "red"},
        ]}
      />
      <button onClick={resetOverride}>Reset overrides</button>
      {resumeSections}
    </section>
  );
}

export default ResumeAssist;
