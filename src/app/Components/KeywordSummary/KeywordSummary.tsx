import React from "react";

export interface KeywordSummaryProps {
  collections: {title: string; keywords: {word: string; color: string}[]}[];
}
function KeywordSummary({collections}: KeywordSummaryProps) {
  const keywordsString = collections.map(({title, keywords}, index) => {
    const wordsColored = keywords.map(({word, color}) => (
      <span key={word} style={{color: color}}>
        {" "}
        {word}{" "}
      </span>
    ));
    return (
      <div key={index}>
        <b>{title}:</b>
        {wordsColored}
      </div>
    );
  });

  function handleClick() {
    const keywordsString = collections.map(({title, keywords}) => {
      const wordsArray = keywords.map(({word}) => word);
      const wordsString = wordsArray.join(", ") + ".";
      return `${title}: ${wordsString}`;
    });

    navigator.clipboard.writeText(keywordsString.join("\n")).then(
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
