import {CSSProperties, useRef} from "react";
import styles from "./KeywordDisplay.module.scss";
import KeywordEditorDialog from "../KeywordEditorDialog/KeywordEditorDialog";

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
  const emptyStyle: CSSProperties = {
    color: "gray",
    borderBottomColor: "lightgray",
  };

  let list = sortedArray.map(([key, value]) => {
    return (
      <li className={styles.keyword} style={value === 0 ? emptyStyle : undefined} key={key}>
        <div
          style={{backgroundColor: highlightColor, width: `${(value / totalKeywords) * 100}%`}}
          className={styles.highlight}
        ></div>
        <span>{key}</span>
        <span>{value}</span>
      </li>
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
        <button onClick={showModal}>+</button>
      </div>
      <h2>{title}</h2>
      <ol>{list}</ol>
    </section>
  );
}

export default KeywordDisplay;
