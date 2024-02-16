import {SkillGroup} from "@/components";
import Image from "next/image";
import React, {useState} from "react";
import type {SkillGroupProps} from "../SkillGroup";
import {SkillItemProps} from "../SkillItem";
import styles from "./SkillSummary.module.scss";

export interface KeywordSummaryProps {
  /** An array of objects that hold the props for a skill group component */
  skillGroups: Pick<SkillGroupProps, "title" | "skills">[];
}
/** Holds a list of skill groups similar to a skill section found in resumes and lets users control which skill groups can be copied to clipboard
 * for easy pasting into their resume.  */
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
      <div className={styles.title}>
        <h2>Skills</h2>
        <button className={styles.button} onClick={copyToClipboard}>
          <Image src={"/content_copy.svg"} alt="My SVG" width={20} height={20} />
        </button>
      </div>
      <div>{skillGroupElements}</div>
    </section>
  );
}

export default SkillSummary;
