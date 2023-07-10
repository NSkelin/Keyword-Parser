import {Meta, StoryObj} from "@storybook/react";
import KeywordList from "./KeywordList";

const meta: Meta<typeof KeywordList> = {
  component: KeywordList,
  decorators: [
    (Story) => (
      <div style={{height: "200px", width: "200px"}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KeywordList>;

export const Default: Story = {
  args: {
    keywords: [
      ["itemA", 5],
      ["itemB", 3],
      ["itemC", 6],
      ["itemA", 1],
      ["itemA", 1],
      ["itemB", 1],
      ["itemB", 1],
    ],
  },
};
