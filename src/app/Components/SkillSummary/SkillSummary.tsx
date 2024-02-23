import {SkillGroup} from "@/components";
import Image from "next/image";
import React, {useEffect} from "react";
import {useImmer} from "use-immer";
import type {Skills} from "../SkillGroup";
import styles from "./SkillSummary.module.scss";

// The object structure that holds the selected / enabled state of each skill group and their skills.
type Groups = Record<
  string,
  {
    selected: boolean;
    [skillName: string]: boolean;
  }
>;

// A copy of the SkillGroupProps interface from the SkillGroup component. but omitting the stateful types "selected" and "enabled".
interface SkillGroups {
  title: string;
  skills: Omit<Skills, "enabled">[];
}

export interface KeywordSummaryProps {
  /** An array of objects that hold the props for a skill group component */
  skillGroups: SkillGroups[];
}
/** Holds a list of skill groups similar to a skill section found in resumes and lets users control which skill groups can be copied to clipboard
 * for easy pasting into their resume.  */
function SkillSummary({skillGroups}: KeywordSummaryProps) {
  const [skillAndGroupState, setSkillAndGroupState] = useImmer<Groups>(createInitialData());

  /**
   * Creates the initial state of the skill groups and their skills with each skill group set to selected and each skill set to enabled.
   *
   * @returns An object that holds the selected / enabled state of each skill group and their skills.
   */
  function createInitialData() {
    const groups: Groups = {};
    for (const group of skillGroups) {
      groups[group.title] = {
        selected: true,
      };

      for (const skill of group.skills) {
        groups[group.title][skill.name] = true;
      }
    }
    return groups;
  }

  /**
   * Every time the skillGroups prop changes, this creates a new state object to hold the updated skillGroups.
   * The new state object copies any existing selected / enabled state from the previous state object.
   * Any removed skill groups or skills will not be copied over and new ones will be set to true.
   */
  useEffect(() => {
    setSkillAndGroupState((draft) => {
      const groups: Groups = {};
      for (const group of skillGroups) {
        groups[group.title] = {
          selected: draft[group.title].selected ?? true,
        };

        for (const skill of group.skills) {
          groups[group.title][skill.name] = draft[group.title][skill.name] ?? true;
        }
      }
      return groups;
    });
  }, [skillGroups, setSkillAndGroupState]);

  /**
   * Toggles the enabled state of a skill.
   *
   * @param groupTitle The title of the group that the skill belongs to.
   * @param skillName The name of the skill to toggle.
   */
  function handleSkillToggle(groupTitle: string, skillName: string) {
    setSkillAndGroupState((draft) => {
      draft[groupTitle][skillName] = !draft[groupTitle][skillName];
    });
  }

  /**
   * Toggles the selected state of a skill group.
   *
   * @param groupTitle The title of the skill group to toggle.
   */
  function handleSkillGroupToggle(groupTitle: string) {
    setSkillAndGroupState((draft) => {
      draft[groupTitle].selected = !draft[groupTitle].selected;
    });
  }

  /**
   * Copies the selected skill groups and their enabled skills to the clipboard.
   */
  function copyToClipboard() {
    let skillSummaryString = "";
    for (const [i, group] of skillGroups.entries()) {
      // Only add the group (and its skills) to the string if it is selected.
      if (skillAndGroupState[group.title].selected) {
        skillSummaryString += group.title + ": ";
        const skills = group.skills.filter((skill) => skillAndGroupState[group.title][skill.name]);

        // Create a string of all the skills in the group.
        const skillsString = skills.reduce<string>((accumulator, {name}, index) => {
          // Place a comma after each skill except for the last one.
          if (index === skills.length - 1) {
            return accumulator + name + ".";
          } else {
            return accumulator + name + ", ";
          }
        }, "");

        skillSummaryString += skillsString;
        // Place a newline after each group except for the last one.
        if (i !== skillGroups.length - 1) skillSummaryString += "\n";
      }
    }

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

  // Create the skill group components.
  const skillGroupElements = Object.entries(skillAndGroupState).map(([title, {selected, ...skills}], index) => {
    // Get the skills for the current group.
    const skills2: Skills[] =
      skillGroups
        .find((group) => group.title === title)
        ?.skills.map((skill) => ({
          // Set the enabled property for each skill based on the saved state.
          ...skill,
          enabled: skills[skill.name],
        })) ?? [];

    return (
      <div key={index}>
        <SkillGroup
          title={title}
          skills={skills2}
          selected={selected}
          onGroupToggle={handleSkillGroupToggle}
          onSkillToggle={handleSkillToggle}
        />
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
