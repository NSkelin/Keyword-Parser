import React, {createElement} from "react";
import styles from "./RegExDisplay.module.scss";
import {createKeywordsRegEx} from "utils";
import {getCollectionAliases} from "utils/prisma";

type RegExDisplayProps = {
  /**
   * Title for the Keyword collection
   */
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};
async function RegExDisplay({title, headingLevel = 3}: RegExDisplayProps) {
  const Heading = createElement("h" + headingLevel, null, title);

  const data = await getCollectionAliases(title);
  const aliases = data[0].keywords;

  return (
    <>
      {Heading}
      <p className={styles.background}>{createKeywordsRegEx(aliases).toString()}</p>
    </>
  );
}

export default RegExDisplay;
