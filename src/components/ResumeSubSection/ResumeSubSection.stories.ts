import {Meta, StoryObj} from "@storybook/react";
import {ResumeSubSection} from "./ResumeSubSection";

const meta: Meta<typeof ResumeSubSection> = {
  component: ResumeSubSection,
};

export default meta;
type Story = StoryObj<typeof ResumeSubSection>;

export interface ResumeSubSectionProps {
  title: string;
  subTitle: string;
  startDate: Date;
  endDate?: Date | null;
  children: React.ReactNode;
}

export const Default: Story = {
  args: {title: "title", subTitle: "subtitle", startDate: new Date(1995), endDate: new Date()},
};
