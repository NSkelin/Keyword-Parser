import {ToggleButton} from "@/components";
import Image from "next/image";
import React from "react";
import styles from "./SkillGroup.module.scss";

export interface Skills {
  name: string;
  hot: boolean;
  proficient: boolean;
  familiar: boolean;
  enabled: boolean;
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
  const fireSVG = <Image src={"/fire.svg"} alt="My SVG" width={12} height={12} />;
  const infoISVG = <Image src={"/info_i.svg"} alt="My SVG" width={12} height={12} />;

  /**
   * Sends the clicked skill to the parent component to handle the toggle.
   * @param skillName The name of the skill that was clicked.
   */
  function handleSkillToggle(skillName: string) {
    onSkillToggle(title, skillName);
  }

  // Creates a toggleable button for each skill in the group.
  // The button will display the skill name and any icons that represent the skill's properties.
  const skillToggles = skills.map(({name, hot, proficient, familiar, enabled}) => (
    <ToggleButton enabled={enabled} key={name} onClick={() => handleSkillToggle(name)}>
      {name}
      {hot ? fireSVG : null}
      {proficient ? infoISVG : null}
      {familiar ? "F" : null}
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
