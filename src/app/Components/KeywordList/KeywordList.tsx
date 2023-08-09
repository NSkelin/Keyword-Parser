import {KeywordItem} from "@/components";
import type {OnEditProps} from "@/components/KeywordItem";
import type {Keyword} from "@/utils/types";
import {CSSProperties} from "react";
import styles from "./KeywordList.module.scss";

/** Creates the \<KeywordItem /> elements for rendering. */
function createListItems(keywords: Keyword[], highlightColor: CSSProperties["backgroundColor"], onEdit: (id: number) => void) {
  // the sum of all keywords instances, used to calculate the highlight percentage for each individual keyword.
  const sum = keywords.reduce((total, {instances}) => (total += instances), 0);

  return keywords.map(({displayName, instances, proficient, id}) => {
    const highlightPercent = (instances / sum) * 100;

    return (
      <KeywordItem
        highlightColor={highlightColor}
        highlightPercent={highlightPercent}
        displayName={displayName}
        key={displayName}
        instances={instances}
        onEdit={onEdit}
        proficient={proficient}
        id={id}
      />
    );
  });
}

/** Sorts the list in descending order, followed by alphabetically for numbers that are the same. */
export function sortList(keywords: Keyword[]) {
  return keywords.sort(({displayName: aName, instances: aNumber}, {displayName: bName, instances: bNumber}) => {
    if (aNumber === bNumber) {
      if (aName.toLocaleLowerCase() < bName.toLocaleLowerCase()) return -1;
      return 1;
    } else if (aNumber > bNumber) return -1;
    return 1;
  });
}

export interface KeywordListProps {
  /** The keywords used to make the list. */
  keywords: Keyword[];
  /** The highlight color to be used for every keyword in this list. */
  highlightColor?: CSSProperties["backgroundColor"];
  /** A callback for when a keyword items edit button is clicked. */
  onEdit: OnEditProps;
}
/** Renders a sorted list of keywords. The list is sorted in descending order followed by alphabetical*/
function KeywordList({keywords, highlightColor = "lightblue", onEdit}: KeywordListProps) {
  const sortedKeywords = sortList(keywords);
  const listItems = createListItems(sortedKeywords, highlightColor, onEdit);

  return (
    <ol data-cy="kw-itemList" className={styles.list}>
      {listItems}
    </ol>
  );
}

export default KeywordList;
