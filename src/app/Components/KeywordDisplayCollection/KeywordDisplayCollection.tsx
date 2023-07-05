import React, {CSSProperties} from "react";
import styles from "./KeywordDisplayCollection.module.scss";
import KeywordDisplay from "../KeywordDisplay";
import {createKeywordsRegEx} from "utils";

export type keyword = {displayName: string; aliases: string[]};
function countKeywords(sourceText: string, keywords: keyword[]) {
  const map = new Map<string, {count: number; aliases: string[]}>();
  for (const words of keywords) {
    const regEx = createKeywordsRegEx(words.aliases);
    const instances = (sourceText.match(regEx) || []).length;
    map.set(words.displayName, {count: instances, aliases: words.aliases});
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
  onCreate: (collectionName: string, displayName: string, aliases: string[]) => void;
  onUpdate: (collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) => void;
  onDelete: (collectionName: string, displayName: string) => void;
};
function KeywordDisplayCollection({text, collections, onCreate, onUpdate, onDelete}: KeywordDisplayCollectionProps) {
  const displays = collections.map(({title, keywords, color}) => {
    return (
      <KeywordDisplay
        key={title}
        keywords={countKeywords(text, keywords)}
        title={title}
        highlightColor={color}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  return <section className={styles.displayCollection}>{displays}</section>;
}

export default KeywordDisplayCollection;
