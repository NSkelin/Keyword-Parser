"use client";
import {CSSProperties, ReactNode, useState} from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {useImmer} from "use-immer";
import {createKeywordsRegEx, getAliases} from "@/app/utils";
import KeywordDisplayCollection from "../KeywordDisplayCollection";
import ResumeAssist from "../ResumeAssist/ResumeAssist";
import styles from "./KeywordParser.module.scss";
import {Prisma} from "@prisma/client";

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
    keywords: {displayName: string; proficient: boolean; aliases: string[]}[];
    highlightColor: CSSProperties["backgroundColor"];
  }[];
  sectionData: sectionData;
}
/** A container component that links a text area that highlights keywords, and the displays that summarize that data, together. */
function KeywordParser({initialDisplays, sectionData}: KeywordParserProps) {
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
    newAliases: string[],
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
          keyword.instances = (sourceText.match(regEx) ?? []).length;
        }
      }
      return;
    });
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
