import {getCollectionAliases, getCollectionKeywords} from "utils/prisma";
import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplayCollection from "./Components/RegExDisplayCollection/RegExDisplayCollection";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionsAliases = await getCollectionAliases();
  // remove empty collections and unnecessary properties
  const highlightFilters = collectionsAliases.reduce((filters, {color, keywords}) => {
    if (keywords.length > 0) filters.push({color: color, filter: keywords});
    return filters;
  }, [] as {color: string | undefined; filter: string[]}[]);

  const collectionKeywords = await getCollectionKeywords();

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <KeywordParser highlightFilters={highlightFilters} initalCollections={collectionKeywords} />
      </div>
      <RegExDisplayCollection />
    </main>
  );
}
