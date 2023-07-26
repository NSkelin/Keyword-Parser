import {getCollectionKeywords, getResumeAssistData} from "src/app/database";
import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplayCollection from "./Components/RegExDisplayCollection/RegExDisplayCollection";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionKeywords = await getCollectionKeywords();
  const testdata = await getResumeAssistData();

  return (
    <main className={styles.main}>
      <KeywordParser initialDisplays={collectionKeywords} sectionData={testdata} />
      <RegExDisplayCollection />
    </main>
  );
}
