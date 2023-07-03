import {CSSProperties, useRef} from "react";
import KeywordEditorDialog from "../KeywordEditorDialog/KeywordEditorDialog";
import KeywordList from "../KeywordList/KeywordList";
import styles from "./KeywordDisplay.module.scss";

export type KeywordDisplayProps = {
  title: string;
  keywords: [string, number][];
  highlightColor: CSSProperties["backgroundColor"];
};
function KeywordDisplay({keywords, title, highlightColor}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    dialogRef.current?.showModal();
  }

  return (
    <section className={styles.wrapper}>
      <KeywordEditorDialog ref={dialogRef} collection={title} />
      <div>
        <input type={"color"}></input>
        <button onClick={showModal}>+</button>
      </div>
      <h2>{title}</h2>
      <KeywordList keywords={keywords} highlightColor={highlightColor} />
    </section>
  );
}

export default KeywordDisplay;
