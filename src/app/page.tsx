import {getCollectionKeywords} from "src/app/database";
import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplayCollection from "./Components/RegExDisplayCollection/RegExDisplayCollection";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionKeywords = await getCollectionKeywords();

  return (
    <main className={styles.main}>
      <KeywordParser initialDisplays={collectionKeywords} />
      <RegExDisplayCollection />
    </main>
  );
}
