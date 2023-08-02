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
        id: 0,
        aliases: ["Burris", "May"],
        instances: 3,
        proficient: true,
        displayName: "Sheppard",
      },
      {
        id: 1,
        aliases: ["Katy", "Stella", "Angelique"],
        instances: 9,
        proficient: true,
        displayName: "Dixon",
      },
      {
        id: 2,
        aliases: ["Nanette"],
        instances: 7,
        proficient: true,
        displayName: "Wilkins",
      },
      {
        id: 3,
        aliases: ["Castro"],
        instances: 2,
        proficient: false,
        displayName: "Acevedo",
      },
      {
        id: 4,
        aliases: ["Herrera"],
        instances: 7,
        proficient: false,
        displayName: "Ophelia",
      },
      {
        id: 5,
        aliases: ["Eula"],
        instances: 7,
        proficient: false,
        displayName: "Hester",
      },
      {
        id: 6,
        aliases: ["Lindsey", "Gwendolyn", "Johns"],
        instances: 9,
        proficient: true,
        displayName: "Denise",
      },
      {
        id: 7,
        aliases: ["Stephens", "Dionne", "Erin"],
        instances: 4,
        proficient: true,
        displayName: "Kari",
      },
      {
        id: 8,
        aliases: ["Latisha", "Yang", "Ginger"],
        instances: 5,
        proficient: true,
        displayName: "Bette",
      },
    ],
    highlightColor: "lightgoldenrodyellow",
  },
};
