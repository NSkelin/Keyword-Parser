import {Meta, StoryObj} from "@storybook/react";
import CommaSeparatedInput from "./CommaSeparatedInput";

const meta: Meta<typeof CommaSeparatedInput> = {
  component: CommaSeparatedInput,
};

export default meta;
type Story = StoryObj<typeof CommaSeparatedInput>;

export const Default: Story = {
  args: {
    label: "label",
    savedInputs: ["Word1", "Word2"],
  },
};
