import {Meta, StoryObj} from "@storybook/react";
import {KeywordEditor} from "./KeywordEditor";

const meta: Meta<typeof KeywordEditor> = {
  component: KeywordEditor,
};
export default meta;
type Story = StoryObj<typeof KeywordEditor>;

export const Default: Story = {
  args: {
    id: 0,
    collection: "collection",
    onKeywordCreate: () => {},
    onKeywordDelete: () => {},
    onKeywordUpdate: () => {},
    onSubmit: () => {},
    onCancel: () => {},
  },
};
