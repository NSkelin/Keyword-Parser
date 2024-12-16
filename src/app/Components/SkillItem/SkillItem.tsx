import React from "react";

export interface SkillItemProps {
  /** The name of the skill. */
  name: string;
  /** The text color for the skills name. */
  color: string;
}
/** A simple span with text and color to represent a skill item. */
function SkillItem({name, color}: SkillItemProps) {
  return <span style={{color: color}}> {name} </span>;
}

export default SkillItem;
