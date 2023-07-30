import React, {CSSProperties} from "react";
import styles from "./KeywordDisplayCollection.module.scss";
import KeywordDisplay from "../KeywordDisplay";
import type {Keyword} from "@/app/utils/types";

export interface Display {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
}
export interface KeywordDisplayCollectionProps {
  /** The list of data used to generate the displays */
  displays: Display[];
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (keywordId: number, collectionName: string, displayName: string, proficient: boolean, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (
    collectionName: string,
    keywordId: number,
    newDisplayName: string,
    proficient: boolean,
    newAliases: string[],
  ) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (collectionName: string, keywordId: number) => void;
}
/** Renders a grouped collection of displays. */
function KeywordDisplayCollection({displays, onCreate, onUpdate, onDelete}: KeywordDisplayCollectionProps) {
  const displaysList = displays.map(({title, keywords, highlightColor}) => {
    return (
      <KeywordDisplay
        key={title}
        keywords={keywords}
        title={title}
        highlightColor={highlightColor}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  return (
    <section className={styles.displayCollection}>
      <div className={styles.overflowContainer}>{displaysList}</div>
    </section>
  );
}

export default KeywordDisplayCollection;
