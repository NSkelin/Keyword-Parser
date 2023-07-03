import {CSSProperties} from "react";
import styles from "./KeywordDisplayItem.module.scss";

export type KeywordDisplayItemProps = {
  /**
   * The color for the background fill.
   */
  highlightColor: CSSProperties["backgroundColor"];
  /**
   * The name of the keyword.
   */
  name: string;
  /**
   * The amount of this keyword.
   */
  instances: number;
  /**
   * Controls how much of the background the highlightColor will highlight (0-100).
   * A helpful way of visualizing the relative amount this keyword has shown up compared to others.
   */
  highlightPercent?: number;
};
function KeywordDisplayItem({highlightColor, name, instances, highlightPercent = 0}: KeywordDisplayItemProps) {
  const emptyStyle: CSSProperties = {
    color: "gray",
    borderBottomColor: "lightgray",
  };
  const itemStyle = instances === 0 ? emptyStyle : undefined;

  return (
    <>
      <li className={styles.item} style={itemStyle}>
        <div style={{backgroundColor: highlightColor, width: `${highlightPercent}%`}} className={styles.highlight}></div>
        <span>{name}</span>
        <span>{instances}</span>
      </li>
    </>
  );
}

export default KeywordDisplayItem;
