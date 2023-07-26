import {Meta, StoryObj} from "@storybook/react";
import KeywordDisplay from "./KeywordDisplay";

const meta: Meta<typeof KeywordDisplay> = {
  component: KeywordDisplay,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplay>;

export const Default: Story = {
  args: {
    title: "qui quis",
    keywords: [
      {
        displayName: "Bradshaw",
        instances: 4,
        proficient: false,
        aliases: ["esse", "cillum"],
      },
      {
        displayName: "Vaughn",
        instances: 1,
        proficient: false,
        aliases: ["dolor", "amet"],
      },
      {
        displayName: "Yolanda",
        instances: 1,
        proficient: true,
        aliases: ["ad", "deserunt", "nulla", "nisi", "amet"],
      },
      {
        displayName: "Rose",
        instances: 10,
        proficient: true,
        aliases: ["proident", "ipsum", "Lorem", "eiusmod"],
      },
      {
        displayName: "Dejesus",
        instances: 3,
        proficient: true,
        aliases: ["cupidatat", "veniam", "eu", "incididunt", "elit"],
      },
    ],
    highlightColor: "lightgoldenrodyellow",
  },
};
