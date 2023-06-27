import KeywordParser from "./Components/KeywordParser/KeywordParser";
import RegExDisplayCollection from "./Components/RegExDisplayCollection/RegExDisplayCollection";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <KeywordParser />
      </div>
      <RegExDisplayCollection />
    </main>
  );
}
