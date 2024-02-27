import Image from "next/image";
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
  const editSVG = <Image src={"/edit.svg"} alt="My SVG" width={16} height={16} />;
  const starSVG = <Image src={"/star.svg"} alt="My SVG" width={12} height={12} />;

  return (
    <li data-cy="keywordItemComp" className={styles.wrapper} style={itemStyle}>
      <div
        data-cy="highlight"
        style={{backgroundColor: highlightColor, width: `${highlightPercent}%`, display: highlightVisible}}
        className={styles.highlight}
      ></div>
      <span>
        {proficient ? starSVG : null}
        {displayName}
      </span>
      <div className={styles.containerEnd}>
        <button data-cy="edit" onClick={() => onEdit(id)}>
          {editSVG}
        </button>
        <span data-cy="instances">{instances}</span>
      </div>
    </li>
  );
}

export default KeywordItem;
