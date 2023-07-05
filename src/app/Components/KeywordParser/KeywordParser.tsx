"use client";
import React, {ReactNode, useState, CSSProperties} from "react";
import {useImmer} from "use-immer";
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
  initalCollections: Collections;
};
function KeywordParser({highlightFilters, initalCollections}: KeywordParserProps) {
  const [value, setValue] = useState("");
  const [collections, setCollections] = useImmer(initalCollections);
  const onChange = (value: string) => setValue(value);

  const highlights = [];
  for (const {color, filter} of highlightFilters) {
    highlights.push({
      highlight: createKeywordsRegEx(filter),
      component: ({children}: {children: ReactNode}) => <HighlightColor color={color}>{children}</HighlightColor>,
    });
  }

  function handleCreateKeyword(collectionName: string, displayName: string, aliases: string[]) {
    setCollections((draft) => {
      draft
        .find((collection) => collection.title === collectionName)
        ?.keywords.push({displayName: displayName, aliases: aliases});
    });
    return;
  }

  function handleUpdateKeyword(collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) {
    setCollections((draft) => {
      const collection = draft.find((collection) => collection.title === collectionName);
      const keyword = collection?.keywords.find((keyword) => keyword.displayName === displayName);
      if (keyword) {
        keyword.aliases = newAliases;
        keyword.displayName = newDisplayName;
      }
    });
    return;
  }

  function handleDeleteKeyword(collectionName: string, displayName: string) {
    console.log(collectionName, displayName);
    setCollections((draft) => {
      const collection = draft.find((collection) => collection.title === collectionName);
      const index = collection?.keywords.findIndex((keyword) => keyword.displayName === displayName);
      if (index !== -1 && index != null) {
        collection?.keywords.splice(index, 1);
      }
    });
    return;
  }

  return (
    <>
      <section className={styles.HighlightAreaWrap}>
        <h2>Text to parse</h2>
        <div className={styles.textArea}>
          <HighlightWithinTextarea value={value} highlight={highlights} onChange={onChange} />
        </div>
      </section>
      <KeywordDisplayCollection
        text={value}
        collections={collections}
        onCreate={handleCreateKeyword}
        onDelete={handleDeleteKeyword}
        onUpdate={handleUpdateKeyword}
      />
    </>
  );
}

export default KeywordParser;
