import {Meta, StoryObj} from "@storybook/react";
import {useState} from "react";
import {Dialog} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const Mock = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Dialog</button>
      <Dialog title="Dialog" open={open}>
        I am the dialog
        <button onClick={() => setOpen(false)}>Close me!</button>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <Mock />,
};
