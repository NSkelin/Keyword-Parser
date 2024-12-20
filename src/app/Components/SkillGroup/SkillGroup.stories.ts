import {Meta, StoryObj} from "@storybook/react";
import {SkillGroup} from "./SkillGroup";

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
        proficient: false,
        familiar: true,
        enabled: false,
      },
      {
        name: "skill 12",
        proficient: false,
        familiar: true,
        enabled: false,
      },
      {
        name: "skill 123",
        proficient: false,
        familiar: true,
        enabled: false,
      },
    ],
  },
};
