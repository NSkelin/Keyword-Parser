import React, {CSSProperties} from "react";
import styles from "./KeywordDisplayCollection.module.scss";
import KeywordDisplay from "../KeywordDisplay";
import {createKeywordsRegEx} from "utils";

// sort by number or alphabetical of number is the same
function sortMap(map: Map<string, number>) {
  const sortedArray = Array.from(map.entries()).sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
  return sortedArray;
}

export type keyword = {displayName: string; aliases: string[]};
function countKeywords(sourceText: string, keywords: keyword[]) {
  const map = new Map<string, number>();

  for (const words of keywords) {
    const regEx = createKeywordsRegEx(words.aliases);
    map.set(words.displayName, (sourceText.match(regEx) || []).length);
  }

  return map;
}

export type Collections = {
  title: string;
  keywords: keyword[];
  color: CSSProperties["backgroundColor"];
}[];
export type KeywordDisplayCollectionProps = {
  /**
   * The text used to count how many times each keyword appears.
   */
  text: string;
  collections: Collections;
};
function KeywordDisplayCollection({text, collections}: KeywordDisplayCollectionProps) {
  const displays = collections.map(({title, keywords, color}) => {
    return <KeywordDisplay key={title} keywords={sortMap(countKeywords(text, keywords))} title={title} highlightColor={color} />;
  });

  return <section className={styles.displayCollection}>{displays}</section>;
}

export default KeywordDisplayCollection;
