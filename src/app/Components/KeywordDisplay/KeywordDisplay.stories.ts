import {Meta, StoryObj} from "@storybook/react";
import KeywordDisplay from "./KeywordDisplay";

const meta: Meta<typeof KeywordDisplay> = {
  component: KeywordDisplay,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplay>;

export const Default: Story = {
  args: {
    title: "My keywords",
    keywords: new Map<string, {count: number; aliases: string[]}>([
      ["word", {count: 5, aliases: ["word1", "word2"]}],
      ["yakuza", {count: 3, aliases: ["yakuza1", "yakuza2"]}],
      ["phone", {count: 3, aliases: ["phone1", "phone2"]}],
    ]),
    highlightColor: "lightgoldenrodyellow",
  },
};
