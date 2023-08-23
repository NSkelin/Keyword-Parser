import {Meta, StoryObj} from "@storybook/react";
import SkillSummary from "./SkillSummary";

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
            color: "green",
          },
          {
            name: "skill 12",
            color: "red",
          },
          {
            name: "skill 123",
            color: "red",
          },
        ],
      },
      {
        title: "group 12",
        skills: [
          {
            name: "skill 1",
            color: "blue",
          },
          {
            name: "skill 12",
            color: "blue",
          },
          {
            name: "skill 123",
            color: "blue",
          },
        ],
      },
    ],
  },
};
