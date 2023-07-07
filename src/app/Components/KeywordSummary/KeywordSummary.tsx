import React from "react";
import styles from "./KeywordSummary.module.scss";

export type KeywordSummaryProps = {keywords: string[]};
function KeywordSummary({keywords}: KeywordSummaryProps) {
  const keywordsString = keywords.join(", ");
  function handleClick() {
    navigator.clipboard.writeText(keywordsString);
  }
  return (
    <section>
      <div>{keywordsString}</div>
      <button onClick={handleClick}>Copy to clipboard</button>
    </section>
  );
}

export default KeywordSummary;
