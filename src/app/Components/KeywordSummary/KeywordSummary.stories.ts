import {Meta, StoryObj} from "@storybook/react";
import KeywordSummary from "./KeywordSummary";

const meta: Meta<typeof KeywordSummary> = {
  component: KeywordSummary,
};

export default meta;
type Story = StoryObj<typeof KeywordSummary>;
// collections: {title: string; keywords: {word: string, color: string}[]}[];
export const Default: Story = {
  args: {
    collections: [
        {
            title: "collection 1",
            keywords: [
                {
                    word: "word 1",
                    color:"green"
                },
                {
                    word: "word 1",
                    color:"red"
                },
                {
                    word: "word 1",
                    color:"red"
                }
            ]
        },
        {
            title: "collection 2",
            keywords: [
                {
                    word: "word 1",
                    color:"blue"
                },
                {
                    word: "word 1",
                    color:"blue"
                },
                {
                    word: "word 1",
                    color:"blue"
                }
            ]
        }
    ]
  }
};
