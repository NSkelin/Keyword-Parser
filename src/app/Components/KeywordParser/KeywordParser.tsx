"use client";
import React, {ReactNode, useState, CSSProperties} from "react";
import {useImmer} from "use-immer";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {createKeywordsRegEx} from "utils";
import KeywordDisplayCollection from "../KeywordDisplayCollection";
import styles from "./KeywordParser.module.scss";

type HighlightColorProps = {
  /** The highlight color */
  color: CSSProperties["backgroundColor"];
  /** React child elements. Required to allow HighlightWithinTextArea to pass in text to be highlighted. */
  children?: ReactNode;
};
/** A React component meant only to allow passing custom highlight colors to the HighlightWithinTextArea component. */
const HighlightColor = ({color, children}: HighlightColorProps) => {
  return <mark style={{backgroundColor: color}}>{children}</mark>;
};

export type KeywordParserProps = {
  /** The initial set of data for displays to ...display. */
  initialDisplays: {
    title: string;
    keywords: {displayName: string; proficient: boolean; aliases: string[]}[];
    highlightColor: CSSProperties["backgroundColor"];
  }[];
};
/** A container component that links a text area that highlights keywords, and the displays that summarize that data, together. */
function KeywordParser({initialDisplays}: KeywordParserProps) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [displays, setDisplays] = useImmer(inits());

  // Create a new displays object and adds instances property to each keyword.
  function inits() {
    return initialDisplays.map(({keywords, ...rest}) => {
      return {
        ...rest,
        keywords: keywords.map(({...rest}) => {
          return {...rest, instances: 0};
        }),
      };
    });
  }

  /** Updates the textAreaInput state and counts each keywords instances in the new textArea state. */
  function handleTextAreaChange(textAreaInput: string) {
    setTextAreaInput(textAreaInput);
    countKeywordInstances(textAreaInput);
  }

  // Creates the highlight array that tells HighlightWithinTextArea what to highlight.
  const highlights = displays.map(({keywords, highlightColor}) => {
    return {
      highlight: createKeywordsRegEx(keywords.flatMap((keyword) => keyword.aliases)),
      component: ({children}: {children: ReactNode}) => <HighlightColor color={highlightColor}>{children}</HighlightColor>,
    };
  });

  /** Adds a given displays keyword to state. */
  function handleCreateKeyword(collectionName: string, displayName: string, proficient: boolean, aliases: string[]) {
    setDisplays((draft) => {
      draft
        .find((collection) => collection.title === collectionName)
        ?.keywords.push({displayName: displayName, instances: 0, proficient: proficient, aliases: aliases});
    });
    return;
  }

  /** Updates states representation of a given displays keyword. */
  function handleUpdateKeyword(
    collectionName: string,
    displayName: string,
    newDisplayName: string,
    proficient: boolean,
    newAliases: string[]
  ) {
    setDisplays((draft) => {
      const collection = draft.find((collection) => collection.title === collectionName);
      const keyword = collection?.keywords.find((keyword) => keyword.displayName === displayName);
      if (keyword) {
        keyword.aliases = newAliases;
        keyword.displayName = newDisplayName;
        keyword.proficient = proficient;
      }
    });
    return;
  }

  /** Deletes a given displays keyword from state. */
  function handleDeleteKeyword(collectionName: string, displayName: string) {
    setDisplays((draft) => {
      const collection = draft.find((collection) => collection.title === collectionName);
      const index = collection?.keywords.findIndex((keyword) => keyword.displayName === displayName);
      if (index !== -1 && index != null) {
        collection?.keywords.splice(index, 1);
      }
    });
    return;
  }

  /** Counts how many times each keyword (and its aliases) appear inside the highlightable textArea and saves it to state.
   * Saves each keywords count individually as the instance property, does not save the total.*/
  function countKeywordInstances(sourceText: string) {
    setDisplays((draft) => {
      for (const display of draft) {
        for (const keyword of display.keywords) {
          const regEx = createKeywordsRegEx(keyword.aliases);
          keyword.instances = (sourceText.match(regEx) || []).length;
        }
      }
      return;
    });
  }

  return (
    <section className={styles.contentWrap}>
      <section className={styles.HighlightAreaWrap}>
        <h2>Text to parse</h2>
        <div className={styles.textArea}>
          <HighlightWithinTextarea value={textAreaInput} highlight={highlights} onChange={handleTextAreaChange} />
        </div>
      </section>
      <KeywordDisplayCollection
        displays={displays}
        onCreate={handleCreateKeyword}
        onDelete={handleDeleteKeyword}
        onUpdate={handleUpdateKeyword}
      />
    </section>
  );
}

export default KeywordParser;
