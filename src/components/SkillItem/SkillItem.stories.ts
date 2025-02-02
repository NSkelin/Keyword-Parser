import {Meta, StoryObj} from "@storybook/react";
import {SkillItem} from "./SkillItem";

const meta: Meta<typeof SkillItem> = {
  component: SkillItem,
};

export default meta;
type Story = StoryObj<typeof SkillItem>;

export const Default: Story = {
  args: {name: "skillName", color: "green"},
};
