"use client";
import {CSSProperties, ReactNode, useState} from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {useImmerReducer} from "use-immer";
import {createKeywordsRegEx, getAliases} from "@/app/utils";
import KeywordDisplayCollection from "../KeywordDisplayCollection";
import ResumeAssist from "../ResumeAssist/ResumeAssist";
import styles from "./KeywordParser.module.scss";
import {Prisma} from "@prisma/client";
import {keywordsReducer} from "./reducer";

type sectionData = Prisma.resumeSectionGetPayload<{
  include: {
    positions: {
      include: {
        bullets: {
          include: {
            requiredKeywords: {
              include: {
                aliases: true;
              };
            };
          };
        };
      };
    };
  };
}>[];

interface HighlightColorProps {
  /** The highlight color */
  color: CSSProperties["backgroundColor"];
  /** React child elements. Required to allow HighlightWithinTextArea to pass in text to be highlighted. */
  children?: ReactNode;
}
/** A React component meant only to allow passing custom highlight colors to the HighlightWithinTextArea component. */
const HighlightColor = ({color, children}: HighlightColorProps) => {
  return <mark style={{backgroundColor: color}}>{children}</mark>;
};

export interface KeywordParserProps {
  /** The initial set of data for displays to ...display. */
  initialDisplays: {
    title: string;
    keywords: {id: number; displayName: string; proficient: boolean; aliases: string[]}[];
    highlightColor: CSSProperties["backgroundColor"];
  }[];
  sectionData: sectionData;
}
/** A container component that links a text area that highlights keywords, and the displays that summarize that data, together. */
function KeywordParser({initialDisplays, sectionData}: KeywordParserProps) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [displays, dispatch] = useImmerReducer(keywordsReducer, inits());

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
  interface highlights {
    highlight: RegExp;
    component: ({children}: {children: ReactNode}) => JSX.Element;
  }

  // Creates the highlight array that tells HighlightWithinTextArea what to highlight.
  // Tells HighlightWithinTextArea to highlight every alias from every keyword in every display.
  function createTextAreaHighlights() {
    const highlights = displays.reduce<highlights[]>((accumulator, {keywords, highlightColor}) => {
      const keywordAliases = getAliases(keywords);
      if (keywordAliases.length < 1) return accumulator;

      const regex = createKeywordsRegEx(keywordAliases);
      const highlightObj = {
        highlight: regex,
        component: ({children}: {children: ReactNode}) => <HighlightColor color={highlightColor}>{children}</HighlightColor>,
      };
      accumulator.push(highlightObj);
      return accumulator;
    }, []);
    return highlights;
  }

  /** Adds a given displays keyword to state. */
  function handleCreateKeyword(
    keywordId: number,
    collectionName: string,
    displayName: string,
    proficient: boolean,
    aliases: string[],
  ) {
    dispatch({
      type: "create",
      keywordId: keywordId,
      aliases: aliases,
      collectionName: collectionName,
      displayName: displayName,
      proficient: proficient,
    });
  }

  /** Updates states representation of a given displays keyword. */
  function handleUpdateKeyword(
    collectionName: string,
    keywordId: number,
    newDisplayName: string,
    proficient: boolean,
    newAliases: string[],
  ) {
    dispatch({
      type: "update",
      collectionName: collectionName,
      keywordId: keywordId,
      newAliases: newAliases,
      newDisplayName: newDisplayName,
      proficient: proficient,
    });
  }

  /** Deletes a given displays keyword from state. */
  function handleDeleteKeyword(collectionName: string, keywordId: number) {
    dispatch({
      type: "delete",
      collectionName: collectionName,
      keywordId: keywordId,
    });
  }

  /** Counts how many times each keyword (and its aliases) appear inside the highlightable textArea and saves it to state.
   * Saves each keywords count individually as the instance property, does not save the total.*/
  function countKeywordInstances(sourceText: string) {
    for (const display of displays) {
      for (const keyword of display.keywords) {
        const regEx = createKeywordsRegEx(keyword.aliases);
        const instances = (sourceText.match(regEx) ?? []).length;
        if (keyword.instances != instances) {
          dispatch({
            type: "update",
            collectionName: display.title,
            keywordId: keyword.id,
            instances: instances,
          });
        }
      }
    }
    return;
  }

  return (
    <>
      <section className={styles.contentWrap}>
        <section className={styles.HighlightAreaWrap}>
          <h2>Text to parse</h2>
          <div className={styles.textArea}>
            <HighlightWithinTextarea
              value={textAreaInput}
              highlight={createTextAreaHighlights()}
              onChange={handleTextAreaChange}
            />
          </div>
        </section>
        <KeywordDisplayCollection
          displays={displays}
          onCreate={handleCreateKeyword}
          onDelete={handleDeleteKeyword}
          onUpdate={handleUpdateKeyword}
        />
      </section>
      <ResumeAssist
        sectionData={sectionData}
        keywordCollections={displays.map(({title, keywords}) => {
          return {title: title, keywords: keywords};
        })}
      />
    </>
  );
}

export default KeywordParser;
