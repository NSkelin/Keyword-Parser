import {getCollectionsAliases} from "@/database/tableQueries/keywordCollection";
import {createKeywordsRegEx} from "@/utils";
import {createElement} from "react";
import styles from "./RegExDisplay.module.scss";

export interface RegExDisplayProps {
  /** The Keyword collection to generate a regEx from. */
  collection: string;
  /** The headling level used to display the collection being generated. Uses \<h{headlinglevel}>. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
/** Renders the generated Regular expression for a given collection. Used for debugging. */
export async function RegExDisplay({collection, headingLevel = 3}: RegExDisplayProps) {
  const Heading = createElement("h" + headingLevel, null, collection);

  const data = await getCollectionsAliases(collection);
  const aliases = data[0].aliases;

  return (
    <>
      {Heading}
      {aliases.length > 0 ? <p className={styles.background}>{createKeywordsRegEx(aliases).toString()}</p> : <></>}
    </>
  );
}
