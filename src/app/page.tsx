import {KeywordParser, RegExDisplayCollection} from "@/components";
import {getResumeAssistData} from "src/app/database/tableQueries/resumeSection";
import {getCollectionKeywords} from "./database/tableQueries/keywordCollection";
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
