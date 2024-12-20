import {KeywordDisplay} from "@/components/KeywordDisplay";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import type {Keyword} from "@/utils/types";
import {CSSProperties} from "react";
import styles from "./KeywordDisplayCollection.module.scss";

export interface Display {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
}
export interface KeywordDisplayCollectionProps extends SubmissionCallbacks {
  /** The list of data used to generate the displays */
  displays: Display[];
}
/** Renders a grouped collection of displays. */
export function KeywordDisplayCollection({displays, onCreate, onUpdate, onDelete}: KeywordDisplayCollectionProps) {
  const displaysList = displays.map(({title, keywords, highlightColor}) => {
    return (
      <KeywordDisplay
        key={title}
        keywords={keywords}
        title={title}
        highlightColor={highlightColor}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  });

  return (
    <section className={styles.displayCollection}>
      <div className={styles.overflowContainer}>{displaysList}</div>
    </section>
  );
}
