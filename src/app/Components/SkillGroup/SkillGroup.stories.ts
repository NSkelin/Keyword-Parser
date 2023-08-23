import {Meta, StoryObj} from "@storybook/react";
import SkillGroup from "./SkillGroup";

const meta: Meta<typeof SkillGroup> = {
  component: SkillGroup,
};

export default meta;
type Story = StoryObj<typeof SkillGroup>;

export const Default: Story = {
  args: {
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
};
