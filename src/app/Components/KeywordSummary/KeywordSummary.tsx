import React from "react";
import styles from "./KeywordSummary.module.scss";

export type KeywordSummaryProps = {keywords: {name: string; instances: number; proficient: boolean}[]};
function KeywordSummary({keywords}: KeywordSummaryProps) {
  const keywordSummary = keywords.reduce<string[]>((accumulator, {name, instances, proficient}) => {
    if (instances > 0 && proficient) {
      accumulator.push(name);
    }
    return accumulator;
  }, []);
  const keywordsString = keywordSummary.join(", ");

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
