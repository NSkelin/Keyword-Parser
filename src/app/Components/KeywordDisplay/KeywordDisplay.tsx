import React from "react";
import styles from "./KeywordDisplay.module.scss";

// create react display
function createDisplayItems(sortedArray: [string, number][]) {
  let list = sortedArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  return list;
}

type KeywordDisplayProps = {keywords: [string, number][]; title: string};
function KeywordDisplay({keywords, title}: KeywordDisplayProps) {
  const list = createDisplayItems(keywords);
  return (
    <div className={styles.list}>
      <h2>{title}</h2>
      <ol>{list}</ol>
    </div>
  );
}

export default KeywordDisplay;
