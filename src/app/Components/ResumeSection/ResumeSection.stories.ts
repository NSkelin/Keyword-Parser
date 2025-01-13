import {Meta, StoryObj} from "@storybook/react";
import {ResumeSection} from "./ResumeSection";

const meta: Meta<typeof ResumeSection> = {
  component: ResumeSection,
};

export default meta;
type Story = StoryObj<typeof ResumeSection>;

export const Default: Story = {
  args: {title: "title"},
};
