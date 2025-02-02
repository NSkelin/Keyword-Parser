import {KeywordParser} from "@/components/KeywordParser";
import {RegExDisplayCollection} from "@/components/RegExDisplayCollection";
import {getCollectionsKeywords} from "@/database/tableQueries/keywordCollection";
import {getResumeAssistData} from "@/database/tableQueries/resumeSection";
import styles from "./page.module.scss";

export default async function Home() {
  const collectionKeywords = await getCollectionsKeywords();
  const resumeAssistSectionData = await getResumeAssistData();

  return (
    <main className={styles.main}>
      <KeywordParser initialDisplays={collectionKeywords} sectionData={resumeAssistSectionData} />
      <RegExDisplayCollection />
    </main>
  );
}
