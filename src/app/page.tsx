import hardSkills from "../keywords/hardSkills.json";
import otherKeywords from "../keywords/other.json";
import softSkills from "../keywords/softSkills.json";
import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplay from "./Components/RegExDisplay/RegExDisplay";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <KeywordParser />
      </div>
      <aside className={styles.regExList}>
        <RegExDisplay title={hardSkills.title} />
        <RegExDisplay title={softSkills.title} />
        <RegExDisplay title={otherKeywords.title} />
      </aside>
    </main>
  );
}
