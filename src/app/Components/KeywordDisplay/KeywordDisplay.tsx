import React, {CSSProperties} from "react";
import styles from "./KeywordDisplay.module.scss";
import type {Property} from "csstype";

function countTotal(array: [string, number][]) {
  let total = 0;
  for (const arr of array) {
    total += arr[1];
  }
  return total;
}

// create react display
function createDisplayItems(sortedArray: [string, number][], highlightColor: Property.BackgroundColor) {
  const totalKeywords = countTotal(sortedArray);
  const emptyStyle: CSSProperties = {
    color: "gray",
    borderBottomColor: "lightgray",
  };

  let list = sortedArray.map(([key, value]) => {
    return (
      <li className={styles.keyword} style={value === 0 ? emptyStyle : undefined} key={key}>
        <div
          style={{backgroundColor: highlightColor, width: `${(value / totalKeywords) * 100}%`}}
          className={styles.highlight}
        ></div>
        <span>{key}</span>
        <span>{value}</span>
      </li>
    );
  });
  return list;
}

type KeywordDisplayProps = {keywords: [string, number][]; title: string; highlightColor: Property.BackgroundColor};
function KeywordDisplay({keywords, title, highlightColor}: KeywordDisplayProps) {
  const list = createDisplayItems(keywords, highlightColor);
  return (
    <section className={styles.list}>
      <h2>{title}</h2>
      <ol>{list}</ol>
    </section>
  );
}

export default KeywordDisplay;
