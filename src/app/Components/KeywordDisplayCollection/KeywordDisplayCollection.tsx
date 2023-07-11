import React, {CSSProperties} from "react";
import styles from "./KeywordDisplayCollection.module.scss";
import KeywordDisplay from "../KeywordDisplay";

export type Keyword = {displayName: string; instances: number; proficient: boolean; aliases: string[]};
export type Display = {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
};
export type KeywordDisplayCollectionProps = {
  /** A keywords count is based on the amount of times it appears in this text. */
  text: string;
  /** The list of data used to generate the displays */
  displays: Display[];
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (collectionName: string, displayName: string, proficient: boolean, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (
    collectionName: string,
    displayName: string,
    newDisplayName: string,
    proficient: boolean,
    newAliases: string[]
  ) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (collectionName: string, displayName: string) => void;
};
/** Renders a grouped collection of displays. */
function KeywordDisplayCollection({text, displays, onCreate, onUpdate, onDelete}: KeywordDisplayCollectionProps) {
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

  return <section className={styles.displayCollection}>{displaysList}</section>;
}

export default KeywordDisplayCollection;
