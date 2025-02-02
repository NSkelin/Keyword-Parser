import {Meta, StoryObj} from "@storybook/react";
import {ToggleButton} from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    children: "Default",
    enabled: false,
  },
};

export const Enabled: Story = {
  args: {
    enabled: true,
    children: "Enabled",
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
    children: "Disabled",
  },
};
