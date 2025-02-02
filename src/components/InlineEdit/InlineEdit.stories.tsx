import {Meta, StoryObj} from "@storybook/react";
import {InlineEdit} from "./InlineEdit";

const meta: Meta<typeof InlineEdit> = {
  component: InlineEdit,
};

export default meta;
type Story = StoryObj<typeof InlineEdit>;

const Mock = () => {
  return <InlineEdit value="test" onSave={() => {}} />;
};

export const Default: Story = {
  render: () => <Mock />,
};
