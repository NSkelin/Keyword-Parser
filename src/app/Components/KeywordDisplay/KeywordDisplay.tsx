import {CSSProperties, useRef} from "react";
import KeywordDisplayItem from "../KeywordDisplayItem/KeywordDisplayItem";
import KeywordEditorDialog from "../KeywordEditorDialog/KeywordEditorDialog";
import styles from "./KeywordDisplay.module.scss";

// counts the total keywords found across all keywords.
// used to calculate the percentage an individual keyword makes up of the total.
function countTotal(array: [string, number][]) {
  let total = 0;
  for (const arr of array) {
    total += arr[1];
  }
  return total;
}

// create react display
function createDisplayItems(sortedArray: [string, number][], highlightColor: CSSProperties["backgroundColor"]) {
  const totalKeywords = countTotal(sortedArray);

  let list = sortedArray.map(([key, value]) => {
    const highlightPercent = (value / totalKeywords) * 100;

    return (
      <KeywordDisplayItem
        highlightColor={highlightColor}
        highlightPercent={highlightPercent}
        name={key}
        key={key}
        instances={value}
      />
    );
  });
  return list;
}

export type KeywordDisplayProps = {keywords: [string, number][]; title: string; highlightColor: CSSProperties["backgroundColor"]};
function KeywordDisplay({keywords, title, highlightColor}: KeywordDisplayProps) {
  const list = createDisplayItems(keywords, highlightColor);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    dialogRef.current?.showModal();
  }

  return (
    <section className={styles.list}>
      <KeywordEditorDialog ref={dialogRef} collection={title} />
      <div>
        <input type={"color"}></input>
        <button onClick={showModal}>+</button>
      </div>
      <h2>{title}</h2>
      <ol>{list}</ol>
    </section>
  );
}

export default KeywordDisplay;
