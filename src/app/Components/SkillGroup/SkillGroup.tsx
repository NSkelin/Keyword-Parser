import {SkillItem} from "@/components";
import React from "react";
import type {SkillItemProps} from "../SkillItem";
import styles from "./SkillGroup.module.scss";

export interface SkillGroupProps {
  title: string;
  skills: SkillItemProps[];
}
function SkillGroup({title, skills}: SkillGroupProps) {
  const wordsColored = skills.map(({name, color}) => <SkillItem key={name} name={name} color={color} />);

  return (
    <div>
      <input type="checkbox" defaultChecked={true} />
      <b> {title}:</b>
      {wordsColored}
    </div>
  );
}

export default SkillGroup;
