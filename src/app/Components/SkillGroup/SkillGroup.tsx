import {SkillItem} from "@/components";
import React from "react";
import type {SkillItemProps} from "../SkillItem";
import styles from "./SkillGroup.module.scss";

export interface SkillGroupProps {
  /** The title used to represent the group of skills. */
  title: string;
  /** An array of objects that hold the props for a skill item component */
  skills: SkillItemProps[];
  /** Controls whether the checkbox is checked or not. */
  selected: boolean;
  /** Callback for when the user clicks the checkbox. */
  onChange: (title: string) => void;
}
/** Multiple \<SkillItem /> components grouped under a single title with a checkbox for activating / disabling the group. */
function SkillGroup({title, skills, selected, onChange}: SkillGroupProps) {
  const wordsColored = skills.map(({name, color}) => <SkillItem key={name} name={name} color={color} />);

  return (
    <div className={styles.wrapper}>
      <input type="checkbox" checked={selected} onChange={() => onChange(title)} />
      <b> {title}:</b>
      {wordsColored}
    </div>
  );
}

export default SkillGroup;
