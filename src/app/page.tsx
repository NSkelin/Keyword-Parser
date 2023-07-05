import {getCollectionKeywords} from "utils/prisma";
import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplayCollection from "./Components/RegExDisplayCollection/RegExDisplayCollection";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionKeywords = await getCollectionKeywords();

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <KeywordParser initalCollections={collectionKeywords} />
      </div>
      <RegExDisplayCollection />
    </main>
  );
}
