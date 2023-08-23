import React from "react";
import styles from "./SkillItem.module.scss";

export interface SkillItemProps {
  name: string;
  color: string;
}
function SkillItem({name, color}: SkillItemProps) {
  return <span style={{color: color}}> {name} </span>;
}

export default SkillItem;
