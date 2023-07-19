import React from "react";
import styles from "./ResumeAssist.module.scss";
import BulletList from "../BulletList/BulletList";
import KeywordSummary from "../KeywordSummary/KeywordSummary";
import {createKeywordsRegEx, getAliases, getFoundProficientKeywords, getUniqueMatches} from "@/app/utils";
import {useImmer} from "use-immer";
import {enableMapSet} from "immer";
enableMapSet();

interface Position {
  title: string;
  start: string;
  end?: string;
  company: string;
}
interface Bullet {
  ID: number;
  /** The text that will be displayed. */
  bullet: string;
  /** Determines if this bullet will always appear / be inserted into the list regardless of any filters. */
  required?: boolean;
  /** Determines if this bullet can be used to fill out a section if its lacking. */
  fill?: boolean;
}
export interface ResumeAssistProps {
  /** The list of job experiences you have. */
  experience: {position: Position; bullets: Bullet[]}[];
  /** A list of your education. */
  education: {position: Position; bullets: Bullet[]}[];
  /** The keywords used to determine which skills & bullets to display. */
  keywords: {displayName: string; instances: number; proficient: boolean; aliases: string[]}[];
}
/** Renders a resume look-a-like to help with actual resume creation. Based on the keywords sent in, each experience / educations bullet points
 * will be displayed or hidden. This assists in choosing the most suitable bullet points for the given keywords.
 */
function ResumeAssist({experience, education, keywords}: ResumeAssistProps) {
  const [overrides, setOverrides] = useImmer<Map<number, boolean>>(new Map());
  const activeBullets: string[] = [];
  const exp = createHistorySections(experience);
  const edu = createHistorySections(education);

  // Create the bullets for each section. Only show bullets that contain the requested keywords
  // that the user is also proficient at.
  function createHistorySections(arr: {position: Position; bullets: Bullet[]}[]) {
    const proficientKeywords = getFoundProficientKeywords(keywords);
    const aliases = getAliases(proficientKeywords);

    return arr.map(({position, bullets}) => {
      const enabledBullets: Bullet[] = [];
      const disabledBullets: Bullet[] = [];
      const autofillBullets: Bullet[] = [];

      // groups the bullets into on of: enabled | disabled | autofill.
      for (const {ID, bullet, required, fill} of bullets) {
        const regEx = createKeywordsRegEx(aliases);
        const override = overrides.get(ID);

        // Decide if the bullet should be enabled, disabled, or used to autofill.
        if (override === true) {
          // user enabled bullet
          enabledBullets.push({ID, bullet});
        } else if (override === false) {
          // user disabled bullet
          disabledBullets.push({ID, bullet});
        } else if (required === true) {
          // bullet is required by default
          enabledBullets.push({ID, bullet});
        } else if (regEx.test(bullet)) {
          // bullet contains any of the keywords
          enabledBullets.push({ID, bullet});
        } else if (fill === true) {
          // bullet can be used as filler
          autofillBullets.push({ID, bullet});
        } else {
          disabledBullets.push({ID, bullet});
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

      // save enabled bullets from all sections.
      for (const {bullet} of enabledBullets) activeBullets.push(bullet);

      return (
        <section key={position.title} className={styles.history}>
          <div className={styles.position}>
            <h3>{position.title}</h3>
            {`${position.start} - ${position.end ? position.end : "now"}`}
          </div>
          <i>{position.company}</i>
          <BulletList enabledBullets={enabledBullets} disabledBullets={disabledBullets} onOverride={handleOverride} />
        </section>
      );
    });
  }

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
  const bulletMatches = getUniqueMatches(activeBullets.join(" "), getAliases(keywords));

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
      <section>
        <h2>Experience </h2>
        {exp}
      </section>
      <section>
        <h2>Education</h2>
        {edu}
      </section>
    </section>
  );
}

export default ResumeAssist;
