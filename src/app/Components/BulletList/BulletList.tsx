import React from "react";
import styles from "./BulletList.module.scss";
import {createKeywordsRegEx} from "utils";

export type BulletListProps = {
  /** The list of strings or bullets to render. */
  bullets: {ID: number; bullet: string}[];
  /** The strings that each bullet will be matched against to decide if it should be crossed out. */
  keywords: string[];
};
/** Renders a list of strings or bullets. Bullets that do not have a match with the passed in keywords are rendered as crossed out. */
function BulletList({bullets, keywords}: BulletListProps) {
  const displayedBullets: {ID: number; bullet: string}[] = [];
  const hiddenBullets: {ID: number; bullet: string}[] = [];

  // filters the bullets into those to be displayed, and those to be crossed out.
  for (const {ID, bullet} of bullets) {
    const regEx = createKeywordsRegEx(keywords);
    if (regEx.test(bullet)) {
      displayedBullets.push({ID, bullet});
    } else {
      hiddenBullets.push({ID, bullet});
    }
  }

  // copies displayed bullets to the clipboard when clicked.
  const copyBulletsToClipboard = () => {
    const bulletsToCopy = displayedBullets.map(({bullet}) => bullet).join("\n");
    navigator.clipboard.writeText(bulletsToCopy);
  };

  return (
    <>
      <button onClick={copyBulletsToClipboard}>Copy to Clipboard</button>
      <ul>
        {displayedBullets.map(({ID, bullet}) => (
          <li key={ID}>{bullet}</li>
        ))}
        {hiddenBullets.map(({ID, bullet}) => (
          <li key={ID} className={styles.hidden}>
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BulletList;
