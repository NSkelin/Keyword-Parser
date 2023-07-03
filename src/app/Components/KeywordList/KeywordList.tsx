import React, {CSSProperties} from "react";
import styles from "./KeywordList.module.scss";
import KeywordItem from "../KeywordItem/KeywordItem";

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
function createListItems(keywords: [string, number][], highlightColor: CSSProperties["backgroundColor"]) {
  const totalKeywords = countTotalKeywords(keywords);

  let list = keywords.map(([keywordName, keywordAmount]) => {
    const highlightPercent = (keywordAmount / totalKeywords) * 100;

    return (
      <KeywordItem
        highlightColor={highlightColor}
        highlightPercent={highlightPercent}
        name={keywordName}
        key={keywordName}
        instances={keywordAmount}
      />
    );
  });
  return list;
}

export type KeywordListProps = {keywords: [string, number][]; highlightColor: CSSProperties["backgroundColor"]};
function KeywordList({keywords, highlightColor}: KeywordListProps) {
  const listItems = createListItems(keywords, highlightColor);

  return <ol className={styles.list}>{listItems}</ol>;
}

export default KeywordList;
