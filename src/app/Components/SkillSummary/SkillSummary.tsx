import {SkillGroup} from "@/components";
import React from "react";
import type {SkillGroupProps} from "../SkillGroup";

export interface KeywordSummaryProps {
  skillGroups: SkillGroupProps[];
}
function SkillSummary({skillGroups}: KeywordSummaryProps) {
  const skillGroupElements = skillGroups.map(({title, skills}, index) => {
    return (
      <div key={index}>
        <SkillGroup title={title} skills={skills} />
      </div>
    );
  });

  function copyToClipboard() {
    const skillGroupArray = skillGroups.map(({title, skills}) => {
      const groupSkills = skills.map(({name}) => name);
      return `${title}: ${groupSkills.join(", ") + "."}`;
    });

    const skillString = skillGroupArray.join("\n");

    navigator.clipboard.writeText(skillString).then(
      () => {
        // TODO ~
        // Success ~
        // Popup notifying successful copy
        return;
      },
      () => {
        // TODO ~
        // Failed ~
        // Popup notifying failed copy
        return;
      },
    );
  }

  return (
    <section>
      <div>{skillGroupElements}</div>
      <button onClick={copyToClipboard}>Copy to clipboard</button>
    </section>
  );
}

export default SkillSummary;
