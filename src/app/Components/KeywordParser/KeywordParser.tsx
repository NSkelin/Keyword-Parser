"use client";
import {useState} from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";
import {createKeywordsRegEx} from "utils";
import KeywordDisplay from "../KeywordDisplay/KeywordDisplay";
import hardSkills from "../../../keywords/hardSkills.json";
import otherKeywords from "../../../keywords/other.json";
import softSkills from "../../../keywords/softSkills.json";
import styles from "./KeywordParser.module.scss";

// sort by number or alphabetical of number is the same
function sortMap(map: Map<string, number>) {
  const sortedArray = Array.from(map.entries()).sort(([aName, aNumber], [bName, bNumber]) => {
    if (aNumber === bNumber) {
      if (aName < bName) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
  return sortedArray;
}

type keyword = {displayName: string; aliases: string[]};
function countKeywords(sourceText: string, keywords: keyword[]) {
  const map = new Map<string, number>();

  for (const words of keywords) {
    const regEx = new RegExp(`\\b${words.aliases.join("\\b|\\b")}\\b`, "gi");
    map.set(words.displayName, (sourceText.match(regEx) || []).length);
  }

  return map;
}

type KeywordParserProps = {};
function KeywordParser({}: KeywordParserProps) {
  const [value, setValue] = useState("");
  const onChange = (value: string) => setValue(value);
  return (
    <>
      <section className={styles.HighlightAreaWrap}>
        <h2>Text to parse</h2>
        <div className={styles.textArea}>
          <HighlightWithinTextarea
            value={value}
            highlight={[
              {
                highlight: createKeywordsRegEx(hardSkills.keywords),
                className: styles.red,
              },
              {
                highlight: createKeywordsRegEx(softSkills.keywords),
                className: styles.blue,
              },
              {
                highlight: createKeywordsRegEx(otherKeywords.keywords),
                className: styles.yellow,
              },
            ]}
            onChange={onChange}
          />
        </div>
      </section>
      <section className={styles.keywordsLists}>
        <KeywordDisplay
          keywords={sortMap(countKeywords(value, hardSkills.keywords))}
          title={hardSkills.title}
          highlightColor="#ffc9c9"
        />
        <KeywordDisplay
          keywords={sortMap(countKeywords(value, softSkills.keywords))}
          title={softSkills.title}
          highlightColor="#a3daff"
        />
        <KeywordDisplay
          keywords={sortMap(countKeywords(value, otherKeywords.keywords))}
          title={otherKeywords.title}
          highlightColor="#ffec99"
        />
      </section>
    </>
  );
}

export default KeywordParser;
