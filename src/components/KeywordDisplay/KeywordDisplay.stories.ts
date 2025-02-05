import {getMockKeywords} from "@/mockData/keywords";
import {Meta, StoryObj} from "@storybook/react";
import {KeywordDisplay} from "./KeywordDisplay";

const meta: Meta<typeof KeywordDisplay> = {
  component: KeywordDisplay,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplay>;

const keywords = getMockKeywords().slice(18);

export const Default: Story = {
  args: {
    title: "Names",
    keywords,
    highlightColor: "lightgoldenrodyellow",
  },
};
