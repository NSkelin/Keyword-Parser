import React from "react";
import styles from "./ResumeAssist.module.scss";
import BulletList from "../BulletList/BulletList";
import KeywordSummary from "../KeywordSummary/KeywordSummary";
import {createKeywordsRegEx, getAliases, getFoundProficientKeywords, getUniqueMatches} from "utils";

type Position = {title: string; start: string; end?: string; company: string};
type Bullet = {ID: number; bullet: string};
export type ResumeAssistProps = {
  /** The list of job experiences you have. */
  experience: {position: Position; bullets: Bullet[]}[];
  /** A list of your education. */
  education: {position: Position; bullets: Bullet[]}[];
  /** The keywords used to determine which skills & bullets to display. */
  keywords: {displayName: string; instances: number; proficient: boolean; aliases: string[]}[];
};
/** Renders a resume look-a-like to help with actual resume creation. Based on the keywords sent in, each experience / educations bullet points
 * will be displayed or hidden. This assists in choosing the most suitable bullet points for the given keywords.
 */
function ResumeAssist({experience, education, keywords}: ResumeAssistProps) {
  const exp = createHistorySections(experience);
  const edu = createHistorySections(education);

  // Create the bullets for each section. Only show bullets that contain the requested keywords
  // that the user is also proficient at.
  function createHistorySections(arr: {position: Position; bullets: Bullet[]}[]) {
    const filteredkeywords = getFoundProficientKeywords(keywords);
    const aliases = getAliases(filteredkeywords);

    return arr.map(({position, bullets}) => {
      return (
        <section key={position.title} className={styles.history}>
          <div className={styles.position}>
            <h3>{position.title}</h3>
            {`${position.start} - ${position.end ? position.end : "now"}`}
          </div>
          <i>{position.company}</i>
          <BulletList bullets={bullets} keywords={aliases} />
        </section>
      );
    });
  }

  // get all active bullets
  const activeBullets: string[] = [];

  function getActiveBullets(workSummary: {position: Position; bullets: Bullet[]}[]) {
    for (const workSection of workSummary) {
      for (const {bullet} of workSection.bullets) {
        const filteredkeywords = getFoundProficientKeywords(keywords);
        const aliases = getAliases(filteredkeywords);
        const regEx = createKeywordsRegEx(aliases);
        if (regEx.test(bullet)) {
          activeBullets.push(bullet);
        }
      }
    }
  }

  getActiveBullets(experience);
  getActiveBullets(education);

  // Get all keywords by name that have a match and the user is proficient in.
  const primaryKeywords = keywords.reduce<string[]>((accumulator, {displayName, instances, proficient}) => {
    if (instances > 0 && proficient) {
      accumulator.push(displayName);
    }
    return accumulator;
  }, []);

  // get all the keywords that can be found in any of the bullets.
  const bulletMatches = getUniqueMatches(activeBullets.join(" "), getAliases(keywords));

  // Get the secondary keywords by removing any primary keywords found in bulletMatches.
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
