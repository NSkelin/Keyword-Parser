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
        instances: 10,
        proficient: true,
        displayName: "Katie",
      },
      {
        instances: 9,
        proficient: false,
        displayName: "John",
      },
      {
        instances: 3,
        proficient: false,
        displayName: "Dillard",
      },
      {
        instances: 0,
        proficient: false,
        displayName: "Phoebe",
      },
      {
        instances: 7,
        proficient: true,
        displayName: "Mckinney",
      },
      {
        instances: 5,
        proficient: false,
        displayName: "Baker",
      },
      {
        instances: 8,
        proficient: true,
        displayName: "Cote",
      },
      {
        instances: 2,
        proficient: true,
        displayName: "Lillie",
      },
    ],
  },
};
