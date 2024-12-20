import {Meta, StoryObj} from "@storybook/react";
import {SkillSummary} from "./SkillSummary";

const meta: Meta<typeof SkillSummary> = {
  component: SkillSummary,
};

export default meta;
type Story = StoryObj<typeof SkillSummary>;
export const Default: Story = {
  args: {
    skillGroups: [
      {
        title: "group 1",
        skills: [
          {
            name: "skill 1",
            proficient: false,
            familiar: true,
          },
          {
            name: "skill 12",
            proficient: false,
            familiar: true,
          },
          {
            name: "skill 123",
            proficient: false,
            familiar: true,
          },
        ],
      },
      {
        title: "group 12",
        skills: [
          {
            name: "skill 1",
            proficient: false,
            familiar: true,
          },
          {
            name: "skill 12",
            proficient: false,
            familiar: true,
          },
          {
            name: "skill 123",
            proficient: false,
            familiar: true,
          },
        ],
      },
    ],
  },
};
