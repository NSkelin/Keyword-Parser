import {CSSProperties} from "react";
import styles from "./KeywordItem.module.scss";

export type OnEditProps = (id: number) => void;

export interface KeywordItemProps {
  /** The color for the background fill. */
  highlightColor?: CSSProperties["backgroundColor"];
  /** The name of the keyword. */
  displayName: string;
  /** A number that represents how many times this keyword appeared in a search. */
  instances?: number;
  /**
   * Controls how much of the background the highlightColor will highlight (0-100).
   * A helpful way of visualizing the relative amount this keyword has shown up compared to others.
   */
  highlightPercent?: number;
  /** A callback for when the edit button is clicked. */
  onEdit: OnEditProps;
  /** Controls if a proficiency tag is shown next to the name. */
  proficient?: boolean;
  /** A unique identifier */
  id: number;
}
/** Renders a single list item \<li> */
function KeywordItem({
  highlightColor = "lightblue",
  displayName,
  instances = 0,
  highlightPercent = 0,
  onEdit,
  proficient = false,
  id,
}: KeywordItemProps) {
  const emptyStyle: CSSProperties = {
    color: "gray",
    borderBottomColor: "lightgray",
  };
  const itemStyle = instances === 0 ? emptyStyle : undefined;
  const highlightVisible = highlightPercent === 0 ? "none" : "block";

  return (
    <li className={styles.container} style={itemStyle}>
      <div
        data-cy="kw-itemHighlight"
        style={{backgroundColor: highlightColor, width: `${highlightPercent}%`, display: highlightVisible}}
        className={styles.highlight}
      ></div>
      <span>
        {proficient ? "-P- " : ""}
        {displayName}
      </span>
      <div className={styles.containerEnd}>
        <button onClick={() => onEdit(id)}>Edit</button>
        <span>{instances}</span>
      </div>
    </li>
  );
}

export default KeywordItem;
