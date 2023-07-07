import React, {createElement} from "react";
import styles from "./RegExDisplay.module.scss";
import {createKeywordsRegEx} from "utils";
import {getCollectionAliases} from "utils/prisma";

type RegExDisplayProps = {
  /** The Keyword collection to generate a regEx from. */
  collection: string;
  /** The headling level used to display the collection being generated. Uses \<h{headlinglevel}>. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};
/** Renders the generated Regular expression for a given collection. Used for debugging. */
async function RegExDisplay({collection, headingLevel = 3}: RegExDisplayProps) {
  const Heading = createElement("h" + headingLevel, null, collection);

  const data = await getCollectionAliases(collection);
  const aliases = data[0].keywords;

  return (
    <>
      {Heading}
      <p className={styles.background}>{createKeywordsRegEx(aliases).toString()}</p>
    </>
  );
}

export default RegExDisplay;
