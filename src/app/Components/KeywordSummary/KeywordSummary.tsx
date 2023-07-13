import React from "react";
import styles from "./KeywordSummary.module.scss";

export type KeywordSummaryProps = {keywords: {keywords: string[]; color: string}[]};
function KeywordSummary({keywords}: KeywordSummaryProps) {
  const keywordsString = keywords.map(({keywords, color}, index) => {
    return (
      <span key={index} style={{color: color}}>
        {keywords.join(", ") + ", "}
      </span>
    );
  });

  function handleClick() {
    const keywordsString = keywords.map(({keywords}) => {
      return keywords.join(", ");
    });
    navigator.clipboard.writeText(keywordsString.join(", ") + ".");
  }
  return (
    <section>
      <div>{keywordsString}</div>
      <button onClick={handleClick}>Copy to clipboard</button>
    </section>
  );
}

export default KeywordSummary;
