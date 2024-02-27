import {ToggleButton} from "@/components";
import Image from "next/image";
import React, {CSSProperties} from "react";
import styles from "./SkillGroup.module.scss";

export interface Skills {
  name: string;
  hot: boolean;
  proficient: boolean;
  familiar: boolean;
  enabled: boolean;
  /**
   * Controls how much of the background the highlightColor will highlight (0-100).
   * A helpful way of visualizing the relative amount this keyword has shown up compared to others.
   */
  highlightPercent?: number;
  /** The color for the background fill. */
  highlightColor?: CSSProperties["backgroundColor"];
}
export interface SkillGroupProps {
  /**
   * The title used to represent the group of skills.
   */
  title: string;
  /**
   * An array of objects that hold the props for the skill.
   */
  skills: Skills[];
  /**
   * Controls whether the checkbox is checked or not. Defaults to true.
   */
  selected: boolean;
  /**
   * Callback for when the user clicks the checkbox.
   */
  onGroupToggle: (title: string) => void;
  onSkillToggle: (groupTitle: string, skillName: string) => void;
}
/**
 * A component that holds a list of skills and lets users control which skills are enabled.
 */
function SkillGroup({title, skills, selected, onGroupToggle, onSkillToggle}: SkillGroupProps) {
  selected = selected ?? true;
  const starSVG = <Image src={"/star.svg"} alt="My SVG" width={12} height={12} />;
  const RadioButtonCheckedSVG = <Image src={"/radio_button_checked.svg"} alt="My SVG" width={12} height={12} />;

  /**
   * Sends the clicked skill to the parent component to handle the toggle.
   * @param skillName The name of the skill that was clicked.
   */
  function handleSkillToggle(skillName: string) {
    onSkillToggle(title, skillName);
  }

  // Creates a toggleable button for each skill in the group.
  // The button will display the skill name and any icons that represent the skill's properties.
  const skillToggles = skills.map(({name, proficient, familiar, enabled, highlightColor, highlightPercent}) => (
    <ToggleButton enabled={enabled} key={name} onClick={() => handleSkillToggle(name)}>
      <div className={styles.highlight} style={{backgroundColor: highlightColor, width: `${highlightPercent}%`}}></div>
      <span className={styles.content}>
        {name}
        {proficient ? starSVG : null}
        {familiar ? RadioButtonCheckedSVG : null}
      </span>
    </ToggleButton>
  ));

  return (
    <div className={selected ? styles.wrapper : styles.wrapperDisabled}>
      <label>
        <input type="checkbox" checked={selected} onChange={() => onGroupToggle(title)} />
        <b>{title}</b>
      </label>
      <div className={styles.skillToggles}>{skillToggles}</div>
    </div>
  );
}

export default SkillGroup;
