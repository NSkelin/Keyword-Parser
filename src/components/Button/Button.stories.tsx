import {Meta, StoryObj} from "@storybook/react";
import Image from "next/image";
import {Button} from "./Button";

const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    buttonStyle: "default",
    children: <>Button</>,
  },
};

export const Submit: Story = {
  args: {
    buttonStyle: "submit",
    children: <>Button</>,
  },
};

export const Delete: Story = {
  args: {
    buttonStyle: "delete",
    children: <>Button</>,
  },
};

export const Create: Story = {
  args: {
    buttonStyle: "create",
    children: <>Button</>,
  },
};

export const Clear: Story = {
  args: {
    buttonStyle: "clear",
    children: <>Button</>,
  },
};

export const IconOnly: Story = {
  args: {
    buttonStyle: "delete",
    iconOnly: true,
    children: <>{trashSVG}</>,
  },
};

export const StretchedWidth: Story = {
  args: {
    buttonStyle: "create",
    stretch: "width",
    children: <>Button</>,
  },
};
