import {Meta, StoryObj} from "@storybook/react";
import KeywordDisplayCollection from "./KeywordDisplayCollection";

const meta: Meta<typeof KeywordDisplayCollection> = {
  component: KeywordDisplayCollection,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplayCollection>;

const mockKeywords = [
  {displayName: "Word", aliases: ["Word", "Word1", "Word2", "Word3", "Word4"]},
  {displayName: "Lorem", aliases: ["Lorem", "Lorem1", "Lorem2", "Lorem3", "Lorem4"]},
  {displayName: "Ipsum", aliases: ["Ipsum", "Ipsum1", "Ipsum2", "Ipsum3", "Ipsum4"]},
  {displayName: "Dolor", aliases: ["Dolor", "Dolor1", "Dolor2", "Dolor3", "Dolor4"]},
  {displayName: "Meh", aliases: ["Meh", "Meh1", "Meh2", "Meh3", "Meh4"]},
];

export const Default: Story = {
  args: {
    displays: [
      {
        highlightColor: "lightgreen",
        keywords: mockKeywords,
        title: "Display 1",
      },
      {
        highlightColor: "lightblue",
        keywords: mockKeywords,
        title: "Display 1",
      },
      {
        highlightColor: "orange",
        keywords: mockKeywords,
        title: "Display 1",
      },
    ],
    text: "word word1 lorem ipsum",
  },
};
