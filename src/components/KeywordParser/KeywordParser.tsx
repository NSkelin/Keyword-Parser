"use client";
import {KeywordDisplayCollection} from "@/components/KeywordDisplayCollection";
import {ResumeBuilder} from "@/components/ResumeBuilder";
import {createKeywordsRegEx, getAliases} from "@/utils";
import {Prisma} from "@prisma/client";
import {CSSProperties, ReactNode, useEffect, useState, type JSX} from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {useImmerReducer} from "use-immer";
import styles from "./KeywordParser.module.scss";
import {collectionsReducer} from "./reducer";

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
export function KeywordParser({initialDisplays, sectionData}: KeywordParserProps) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [displays, dispatch] = useImmerReducer(collectionsReducer, initialDisplays, inits);

  useEffect(() => {
    const eventSource = new EventSource("/api/descriptionUpdate");

    eventSource.onmessage = (event: MessageEvent) => {
      if (typeof event.data != "string") return;
      const data: unknown = JSON.parse(event.data);

      // make sure data is an object with content
      if (!data || typeof data !== "object" || "content" in data === false || typeof data.content !== "string") return;

      setTextAreaInput(data.content);
      console.log(data);
    };

    return () => {
      eventSource.close();
    };
  });

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
    countAllKeywordsInstances(textAreaInput);
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
      type: "createKeyword",
      keywordId: keywordId,
      aliases: aliases,
      collectionName: collectionName,
      displayName: displayName,
      proficient: proficient,
      instances: countInstances(aliases),
    });
  }

  /** Updates states representation of a given displays keyword. */
  function handleUpdateKeyword(
    keywordId: number,
    collectionName: string,
    newDisplayName: string,
    newProficiency: boolean,
    newAliases: string[],
  ) {
    dispatch({
      type: "updateKeyword",
      collectionName: collectionName,
      keywordId: keywordId,
      newAliases: newAliases,
      newDisplayName: newDisplayName,
      proficient: newProficiency,
      instances: countInstances(newAliases),
    });
  }

  /** Deletes a given displays keyword from state. */
  function handleDeleteKeyword(keywordId: number, collectionName: string) {
    dispatch({
      type: "deleteKeyword",
      collectionName: collectionName,
      keywordId: keywordId,
    });
  }

  /**
   * Updates state with the new collection.
   */
  function handleCreateCollection(collectionName: string) {
    dispatch({
      type: "createCollection",
      collectionName,
    });
  }

  function handleUpdateCollection(collectionName: string, newCollectionName: string, newHighlightColor: string) {
    dispatch({
      type: "updateCollection",
      collectionName,
      newCollectionName,
      newHighlightColor,
    });
  }

  function handleDeleteCollection(collectionName: string) {
    dispatch({
      type: "deleteCollection",
      collectionName,
    });
  }

  /** Searches the text area's input for each alias and returns the total count found. */
  function countInstances(aliases: string[], sourceText = textAreaInput) {
    const regEx = createKeywordsRegEx(aliases);
    const instances = (sourceText.match(regEx) ?? []).length;
    return instances;
  }

  /** Counts how many times each keyword (and its aliases) appear inside the highlightable textArea and saves it to state.
   * Saves each keywords count individually as the instance property, does not save the total.*/
  function countAllKeywordsInstances(sourceText: string) {
    for (const display of displays) {
      for (const keyword of display.keywords) {
        const instances = countInstances(keyword.aliases, sourceText);
        if (keyword.instances != instances) {
          dispatch({
            type: "updateKeyword",
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
          onKeywordCreate={handleCreateKeyword}
          onKeywordDelete={handleDeleteKeyword}
          onKeywordUpdate={handleUpdateKeyword}
          onCollectionCreate={handleCreateCollection}
          onCollectionUpdate={handleUpdateCollection}
          onCollectionDelete={handleDeleteCollection}
        />
      </section>
      <ResumeBuilder sectionData={sectionData} keywordCollections={displays} />
    </>
  );
}
