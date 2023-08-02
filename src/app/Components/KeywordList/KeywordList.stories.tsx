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
      {
        id: 0,
        displayName: "Sheppard",
        instances: 3,
        proficient: true,
        aliases: ["Burris", "May"],
      },
      {
        id: 1,
        displayName: "Dixon",
        instances: 9,
        proficient: true,
        aliases: ["Katy", "Stella", "Angelique"],
      },
      {
        id: 2,
        displayName: "Wilkins",
        instances: 7,
        proficient: true,
        aliases: ["Nanette"],
      },
      {
        id: 3,
        displayName: "Acevedo",
        instances: 2,
        proficient: false,
        aliases: ["Castro"],
      },
      {
        id: 4,
        displayName: "Ophelia",
        instances: 7,
        proficient: false,
        aliases: ["Herrera"],
      },
      {
        id: 5,
        displayName: "Hester",
        instances: 7,
        proficient: false,
        aliases: ["Eula"],
      },
      {
        id: 6,
        displayName: "Denise",
        instances: 9,
        proficient: true,
        aliases: ["Lindsey", "Gwendolyn", "Johns"],
      },
      {
        id: 7,
        displayName: "Kari",
        instances: 4,
        proficient: true,
        aliases: ["Stephens", "Dionne", "Erin"],
      },
      {
        id: 8,
        displayName: "Bette",
        instances: 5,
        proficient: true,
        aliases: ["Latisha", "Yang", "Ginger"],
      },
    ],
  },
};
