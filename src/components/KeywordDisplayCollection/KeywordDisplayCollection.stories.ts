import {Meta, StoryObj} from "@storybook/react";
import {KeywordDisplayCollection} from "./KeywordDisplayCollection";

const meta: Meta<typeof KeywordDisplayCollection> = {
  component: KeywordDisplayCollection,
};

export default meta;
type Story = StoryObj<typeof KeywordDisplayCollection>;

export const Default: Story = {
  args: {
    displays: [
      {
        highlightColor: "lightgreen",
        keywords: [
          {
            id: 1,
            displayName: "Juliana",
            instances: 7,
            proficient: true,
            aliases: ["nostrud", "labore", "sit", "non", "occaecat"],
          },
          {
            id: 2,
            displayName: "Sweet",
            instances: 5,
            proficient: false,
            aliases: ["fugiat", "eiusmod", "labore", "laborum", "aute"],
          },
          {
            id: 3,
            displayName: "Hahn",
            instances: 8,
            proficient: true,
            aliases: ["aliquip", "nulla", "aute", "nulla"],
          },
          {
            id: 4,
            displayName: "Richardson",
            instances: 5,
            proficient: true,
            aliases: ["duis", "pariatur", "irure", "est", "occaecat"],
          },
          {
            id: 5,
            displayName: "Walton",
            instances: 9,
            proficient: true,
            aliases: ["ex", "consequat", "in", "anim", "ipsum"],
          },
          {
            id: 6,
            displayName: "Mcdowell",
            instances: 2,
            proficient: false,
            aliases: ["magna", "ullamco", "sit", "veniam", "non"],
          },
          {
            id: 7,
            displayName: "Lane",
            instances: 4,
            proficient: true,
            aliases: ["culpa", "excepteur", "veniam", "laborum", "elit"],
          },
          {
            id: 8,
            displayName: "Edwards",
            instances: 6,
            proficient: false,
            aliases: ["esse", "Lorem", "dolor", "consectetur", "magna"],
          },
        ],
        title: "Display 1",
      },
      {
        highlightColor: "lightblue",
        keywords: [
          {
            id: 1,
            displayName: "Dorothy",
            instances: 1,
            proficient: true,
            aliases: ["Lorem", "dolore", "labore"],
          },
          {
            id: 2,
            displayName: "Joyce",
            instances: 3,
            proficient: false,
            aliases: ["Lorem", "anim"],
          },
          {
            id: 3,
            displayName: "Beatrice",
            instances: 2,
            proficient: true,
            aliases: ["in", "ea", "ex", "pariatur", "ad"],
          },
          {
            id: 4,
            displayName: "Rhoda",
            instances: 8,
            proficient: true,
            aliases: ["commodo", "esse"],
          },
          {
            id: 5,
            displayName: "Margarita",
            instances: 2,
            proficient: true,
            aliases: ["laborum", "qui"],
          },
          {
            id: 6,
            displayName: "Robbins",
            instances: 6,
            proficient: false,
            aliases: ["minim", "aliquip", "incididunt"],
          },
        ],
        title: "Display 1",
      },
      {
        highlightColor: "orange",
        keywords: [
          {
            id: 1,
            displayName: "Lancaster",
            instances: 7,
            proficient: true,
            aliases: ["ipsum", "mollit"],
          },
          {
            id: 2,
            displayName: "Austin",
            instances: 6,
            proficient: true,
            aliases: ["commodo", "voluptate"],
          },
          {
            id: 3,
            displayName: "Schwartz",
            instances: 6,
            proficient: false,
            aliases: ["commodo", "occaecat", "ex", "enim", "ex"],
          },
          {
            id: 4,
            displayName: "Annette",
            instances: 0,
            proficient: false,
            aliases: ["eiusmod", "labore", "magna", "sint"],
          },
          {
            id: 5,
            displayName: "Lynn",
            instances: 3,
            proficient: false,
            aliases: ["amet", "reprehenderit", "est", "mollit", "non"],
          },
          {
            id: 6,
            displayName: "Cleveland",
            instances: 4,
            proficient: false,
            aliases: ["cupidatat", "magna", "minim"],
          },
        ],
        title: "Display 1",
      },
    ],
  },
};
