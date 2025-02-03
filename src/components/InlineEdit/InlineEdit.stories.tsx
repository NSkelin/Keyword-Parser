import {Meta, StoryObj} from "@storybook/react";
import {InlineEdit} from "./InlineEdit";

const meta: Meta<typeof InlineEdit> = {
  component: InlineEdit,
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const Default: Story = {
  args: {
    value: "title",
    children: <>Title</>,
  },
};
