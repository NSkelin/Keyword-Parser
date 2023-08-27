import {SkillGroup} from "@/components";
import React, {useState} from "react";
import type {SkillGroupProps} from "../SkillGroup";
import {SkillItemProps} from "../SkillItem";

export interface KeywordSummaryProps {
  skillGroups: SkillGroupProps[];
}
function SkillSummary({skillGroups}: KeywordSummaryProps) {
  const [selectedGroups, setSelectedGroups] = useState<Map<string, boolean>>(initSelectedGroups());

  function initSelectedGroups() {
    const map = new Map();
    for (const group of skillGroups) {
      map.set(group.title, true);
    }
    return map;
  }

  function toggleGroup(title: string) {
    const group = selectedGroups.get(title);
    selectedGroups.set(title, !group);
    setSelectedGroups(new Map(selectedGroups));
  }

  /** Converts the skill summary data into a string and copys to clipboard */
  function copyToClipboard() {
    // reduces the skills into a single string
    function createSkillString(skills: SkillItemProps[]) {
      const skillsString = skills.reduce<string>((accumulator, {name}, index) => {
        // place a period after the last skill instead of a comma
        if (index === skills.length - 1) {
          return accumulator + name + ".";
        } else {
          return accumulator + name + ", ";
        }
      }, "");
      return skillsString;
    }

    // reduce the selected skill groups into a single string
    const skillSummaryString = skillGroups.reduce<string>((accumulator, {title, skills}) => {
      if (selectedGroups.get(title)) {
        const skillsString = createSkillString(skills);
        if (accumulator === "") {
          return accumulator + `${title}: ${skillsString}`;
        } else {
          return accumulator + `\n${title}: ${skillsString}`;
        }
      }
      return accumulator;
    }, "");

    navigator.clipboard.writeText(skillSummaryString).then(
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

  const skillGroupElements = skillGroups.map(({title, skills}, index) => {
    return (
      <div key={index}>
        <SkillGroup title={title} skills={skills} selected={selectedGroups.get(title) ?? false} onChange={toggleGroup} />
      </div>
    );
  });

  return (
    <section>
      <div>{skillGroupElements}</div>
      <button onClick={copyToClipboard}>Copy to clipboard</button>
    </section>
  );
}

export default SkillSummary;
