import React from "react";
import styles from "./RegExDisplayCollection.module.scss";
import RegExDisplay from "../RegExDisplay/RegExDisplay";

type keyword = {displayName: string; aliases: string[]};
type keywords = {title: string; keywords: keyword[]};
export type RegExDisplayCollectionProps = {
  keywordsCollection: keywords[];
};
function RegExDisplayCollection({keywordsCollection}: RegExDisplayCollectionProps) {
  const displays = keywordsCollection.map((keywords) => {
    return <RegExDisplay key={keywords.title} title={keywords.title} keywords={keywords.keywords} />;
  });

  return <aside className={styles.regExList}>{displays}</aside>;
}

export default RegExDisplayCollection;
