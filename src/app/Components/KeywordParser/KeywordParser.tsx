"use client";
import React, {ReactNode, useState, CSSProperties} from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {createKeywordsRegEx} from "utils";
import KeywordDisplayCollection from "../KeywordDisplayCollection";
import styles from "./KeywordParser.module.scss";
import {Collections} from "../KeywordDisplayCollection";

type HighlightColorProps = {color: CSSProperties["backgroundColor"]; children?: ReactNode};
const HighlightColor = ({color, children}: HighlightColorProps) => {
  return <mark style={{backgroundColor: color}}>{children}</mark>;
};

export type KeywordParserProps = {
  highlightFilters: {
    color: string | undefined;
    filter: string[];
  }[];
  collections: Collections;
};
function KeywordParser({highlightFilters, collections}: KeywordParserProps) {
  const [value, setValue] = useState("");
  const onChange = (value: string) => setValue(value);

  let highlights = [];
  for (const {color, filter} of highlightFilters) {
    highlights.push({
      highlight: createKeywordsRegEx(filter),
      component: ({children}: {children: ReactNode}) => <HighlightColor color={color}>{children}</HighlightColor>,
    });
  }

  return (
    <>
      <section className={styles.HighlightAreaWrap}>
        <h2>Text to parse</h2>
        <div className={styles.textArea}>
          <HighlightWithinTextarea value={value} highlight={highlights} onChange={onChange} />
        </div>
      </section>
      <KeywordDisplayCollection text={value} collections={collections} />
    </>
  );
}

export default KeywordParser;
