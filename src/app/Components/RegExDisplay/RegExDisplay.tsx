import React, {createElement} from "react";
import styles from "./RegExDisplay.module.scss";
import {createKeywordsRegEx} from "utils";

type keyword = {displayName: string; aliases: string[]};

type RegExDisplayProps = {
  title: string;
  keywords: keyword[];
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};
function RegExDisplay({title, keywords, headingLevel = 3}: RegExDisplayProps) {
  const Heading = createElement("h" + headingLevel, null, title);

  return (
    <>
      {Heading}
      <p className={styles.background}>{createKeywordsRegEx(keywords).toString()}</p>
    </>
  );
}

export default RegExDisplay;
