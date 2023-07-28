import {Meta, StoryObj} from "@storybook/react";
import KeywordDisplayCollection from "./KeywordDisplayCollection";

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
            displayName: "Juliana",
            instances: 7,
            proficient: true,
            aliases: ["nostrud", "labore", "sit", "non", "occaecat"],
          },
          {
            displayName: "Sweet",
            instances: 5,
            proficient: false,
            aliases: ["fugiat", "eiusmod", "labore", "laborum", "aute"],
          },
          {
            displayName: "Hahn",
            instances: 8,
            proficient: true,
            aliases: ["aliquip", "nulla", "aute", "nulla"],
          },
          {
            displayName: "Richardson",
            instances: 5,
            proficient: true,
            aliases: ["duis", "pariatur", "irure", "est", "occaecat"],
          },
          {
            displayName: "Walton",
            instances: 9,
            proficient: true,
            aliases: ["ex", "consequat", "in", "anim", "ipsum"],
          },
          {
            displayName: "Mcdowell",
            instances: 2,
            proficient: false,
            aliases: ["magna", "ullamco", "sit", "veniam", "non"],
          },
          {
            displayName: "Lane",
            instances: 4,
            proficient: true,
            aliases: ["culpa", "excepteur", "veniam", "laborum", "elit"],
          },
          {
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
            displayName: "Dorothy",
            instances: 1,
            proficient: true,
            aliases: ["Lorem", "dolore", "labore"],
          },
          {
            displayName: "Joyce",
            instances: 3,
            proficient: false,
            aliases: ["Lorem", "anim"],
          },
          {
            displayName: "Beatrice",
            instances: 2,
            proficient: true,
            aliases: ["in", "ea", "ex", "pariatur", "ad"],
          },
          {
            displayName: "Rhoda",
            instances: 8,
            proficient: true,
            aliases: ["commodo", "esse"],
          },
          {
            displayName: "Margarita",
            instances: 2,
            proficient: true,
            aliases: ["laborum", "qui"],
          },
          {
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
            displayName: "Lancaster",
            instances: 7,
            proficient: true,
            aliases: ["ipsum", "mollit"],
          },
          {
            displayName: "Austin",
            instances: 6,
            proficient: true,
            aliases: ["commodo", "voluptate"],
          },
          {
            displayName: "Schwartz",
            instances: 6,
            proficient: false,
            aliases: ["commodo", "occaecat", "ex", "enim", "ex"],
          },
          {
            displayName: "Annette",
            instances: 0,
            proficient: false,
            aliases: ["eiusmod", "labore", "magna", "sint"],
          },
          {
            displayName: "Lynn",
            instances: 3,
            proficient: false,
            aliases: ["amet", "reprehenderit", "est", "mollit", "non"],
          },
          {
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
