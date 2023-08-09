import {KeywordParser, RegExDisplayCollection} from "@/components";
import {getCollectionKeywords, getResumeAssistData} from "src/app/database";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionKeywords = await getCollectionKeywords();
  const resumeAssistSectionData = await getResumeAssistData();

  return (
    <main className={styles.main}>
      <KeywordParser initialDisplays={collectionKeywords} sectionData={resumeAssistSectionData} />
      <RegExDisplayCollection />
    </main>
  );
}
