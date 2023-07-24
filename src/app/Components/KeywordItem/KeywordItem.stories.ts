import {Meta, StoryObj} from "@storybook/react";
import KeywordItem from "./KeywordItem";

const meta: Meta<typeof KeywordItem> = {
  component: KeywordItem,
};

export default meta;
type Story = StoryObj<typeof KeywordItem>;

export const Default: Story = {
  args: {
    instances: 5,
    highlightPercent: 20,
    displayName: "keyword",
  },
};
