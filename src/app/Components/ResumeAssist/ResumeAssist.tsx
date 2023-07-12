import React from "react";
import styles from "./ResumeAssist.module.scss";
import BulletList from "../BulletList/BulletList";

type Position = {title: string; start: string; end?: string; company: string};
type Bullet = {ID: number; bullet: string};
export type ResumeAssistProps = {
  /** The list of job experiences you have. */
  experience: {position: Position; bullets: Bullet[]}[];
  /** A list of your education. */
  education: {position: Position; bullets: Bullet[]}[];
  /** The keywords to compare each bullet to, to decide which to hide or display. */
  keywords: string[];
};
/** Renders a resume look-a-like to help with actual resume creation. Based on the keywords sent in, each experience / educations bullet points
 * will be displayed or hidden. This assists in choosing the most suitable bullet points for the given keywords.
 */
function ResumeAssist({experience, education, keywords}: ResumeAssistProps) {
  const exp = createHistorySections(experience);
  const edu = createHistorySections(education);

  function createHistorySections(arr: {position: Position; bullets: Bullet[]}[]) {
    return arr.map(({position, bullets}) => {
      return (
        <section key={position.title} className={styles.history}>
          <div className={styles.position}>
            <h3>{position.title}</h3>
            {`${position.start} - ${position.end ? position.end : "now"}`}
          </div>
          <i>{position.company}</i>
          <BulletList bullets={bullets} keywords={keywords} />
        </section>
      );
    });
  }

  return (
    <section className={styles.container}>
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
