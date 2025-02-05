import {getMockKeywords} from "@/mockData/keywords";
import {Meta, StoryObj} from "@storybook/react";
import {KeywordDisplayCollection} from "./KeywordDisplayCollection";

const meta: Meta<typeof KeywordDisplayCollection> = {
  component: KeywordDisplayCollection,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplayCollection>;

const keywords = getMockKeywords();

export const MultipleCollections: Story = {
  args: {
    displays: [
      {highlightColor: "lightgreen", keywords, title: "Favourites"},
      {highlightColor: "lightblue", keywords, title: "Colleagues"},
      {highlightColor: "orange", keywords, title: "Names"},
    ],
  },
};

export const SingleCollection: Story = {
  args: {
    displays: [{highlightColor: "lightgreen", keywords, title: "Display 1"}],
  },
};

export const EmptyList: Story = {
  args: {displays: []},
};
