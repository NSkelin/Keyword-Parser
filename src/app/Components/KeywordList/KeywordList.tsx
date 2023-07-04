import {CSSProperties} from "react";
import KeywordItem from "../KeywordItem/KeywordItem";
import styles from "./KeywordList.module.scss";

// counts the total keywords found across all keywords.
// used to calculate the percentage an individual keyword makes up of the total.
function countTotalKeywords(array: [string, number][]) {
  let total = 0;
  for (const arr of array) {
    total += arr[1];
  }
  return total;
}

// create react display
function createListItems(
  keywords: [string, number][],
  highlightColor: CSSProperties["backgroundColor"],
  onEdit: (name: string) => void
) {
  const totalKeywords = countTotalKeywords(keywords);

  const list = keywords.map(([keywordName, keywordAmount]) => {
    const highlightPercent = (keywordAmount / totalKeywords) * 100;

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
  return list;
}

// Sort the list of keywords by number, or alphabetically if the numbers are the same.
function sortList(keywordsList: [string, number][]) {
  const sortedArray = keywordsList.sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
  return sortedArray;
}

export type KeywordListProps = {
  keywords: [string, number][];
  highlightColor: CSSProperties["backgroundColor"];
  onEdit: (name: string) => void;
};
function KeywordList({keywords, highlightColor, onEdit}: KeywordListProps) {
  const sortedKeywords = sortList(keywords);
  const listItems = createListItems(sortedKeywords, highlightColor, onEdit);

  return <ol className={styles.list}>{listItems}</ol>;
}

export default KeywordList;
