import React from "react";

export interface KeywordSummaryProps {
  keywords: {keywords: string[]; color: string}[];
}
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
    navigator.clipboard.writeText(keywordsString.join(", ") + ".").then(
      () => {
        // TODO ~
        // Success ~
        // Popup notifying successful copy
        return;
      },
      () => {
        // TODO ~
        // Failed ~
        // Popup notifying failed copy
        return;
      },
    );
  }

  return (
    <section>
      <div>{keywordsString}</div>
      <button onClick={handleClick}>Copy to clipboard</button>
    </section>
  );
}

export default KeywordSummary;
