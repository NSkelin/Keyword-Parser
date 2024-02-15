import {ToggleButton} from "@/components";
import Image from "next/image";
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
  const fireSVG = <Image src={"/fire.svg"} alt="My SVG" width={12} height={12} />;
  const infoISVG = <Image src={"/info_i.svg"} alt="My SVG" width={12} height={12} />;

  // Converts each skill into a toggleable button.
  const skillToggles = skills.map(({name, color}) => (
    <ToggleButton initialState={true} key={name}>
      {name}
      {color === "green" ? fireSVG : color === "red" ? null : infoISVG}
    </ToggleButton>
  ));

  return (
    <div className={selected ? styles.wrapper : styles.wrapperDisabled}>
      <label>
        <input type="checkbox" checked={selected} onChange={() => onChange(title)} />
        <b>{title}</b>
      </label>
      <div className={styles.skillToggles}>{skillToggles}</div>
    </div>
  );
}

export default SkillGroup;
