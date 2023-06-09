import {CSSProperties} from "react";
import styles from "./KeywordItem.module.scss";

export type KeywordItemProps = {
  /** The color for the background fill. */
  highlightColor?: CSSProperties["backgroundColor"];
  /** The name of the keyword. */
  name: string;
  /** A number that represents how many times this keyword appeared in a search. */
  instances?: number;
  /**
   * Controls how much of the background the highlightColor will highlight (0-100).
   * A helpful way of visualizing the relative amount this keyword has shown up compared to others.
   */
  highlightPercent?: number;
  /** A callback for when the edit button is clicked. */
  onEdit: (name: string) => void;
};
/** Renders a single list item \<li> */
function KeywordItem({highlightColor = "lightblue", name, instances = 0, highlightPercent = 0, onEdit}: KeywordItemProps) {
  const emptyStyle: CSSProperties = {
    color: "gray",
    borderBottomColor: "lightgray",
  };
  const itemStyle = instances === 0 ? emptyStyle : undefined;

  return (
    <li className={styles.container} style={itemStyle}>
      <div style={{backgroundColor: highlightColor, width: `${highlightPercent}%`}} className={styles.highlight}></div>
      <span>{name}</span>
      <div className={styles.containerEnd}>
        <button onClick={() => onEdit(name)}>Edit</button>
        <span>{instances}</span>
      </div>
    </li>
  );
}

export default KeywordItem;
