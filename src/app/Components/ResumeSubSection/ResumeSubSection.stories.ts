import {Meta, StoryObj} from "@storybook/react";
import ResumeSubSection from "./ResumeSubSection";

const meta: Meta<typeof ResumeSubSection> = {
  component: ResumeSubSection,
};

export default meta;
type Story = StoryObj<typeof ResumeSubSection>;

export const Default: Story = {
  args: {},
};
