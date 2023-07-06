import {CSSProperties} from "react";
import KeywordItem from "../KeywordItem/KeywordItem";
import styles from "./KeywordList.module.scss";

/** Creates the \<KeywordItem /> elements for rendering. */
function createListItems(
  keywords: [string, number][],
  highlightColor: CSSProperties["backgroundColor"],
  onEdit: (name: string) => void
) {
  // the sum of all keywords instances, used to calculate the highlight percentage for each individual keyword.
  const sum = keywords.reduce((total, [, num]) => (total += num), 0);

  return keywords.map(([keywordName, keywordAmount]) => {
    const highlightPercent = (keywordAmount / sum) * 100;

    return (
      <KeywordItem
        highlightColor={highlightColor}
        highlightPercent={highlightPercent}
        name={keywordName}
        key={keywordName}
        instances={keywordAmount}
        onEdit={onEdit}
      />
    );
  });
}

/** Sorts the list in descending order, followed by alphabetically for numbers that are the same. */
function sortList(keywordsList: [string, number][]) {
  return keywordsList.sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
}

export type KeywordListProps = {
  /** The keywords used to make the list. The string is the keywords name and the number is its count. */
  keywords: [string, number][];
  /** The highlight color to be used for every keyword in this list. */
  highlightColor?: CSSProperties["backgroundColor"];
  /** A callback for when a keyword items edit button is clicked. */
  onEdit: (name: string) => void;
};
/** Renders a sorted list of keywords. The list is sorted in descending order followed by alphabetical*/
function KeywordList({keywords, highlightColor = "lightblue", onEdit}: KeywordListProps) {
  const sortedKeywords = sortList(keywords);
  const listItems = createListItems(sortedKeywords, highlightColor, onEdit);

  return <ol className={styles.list}>{listItems}</ol>;
}

export default KeywordList;
