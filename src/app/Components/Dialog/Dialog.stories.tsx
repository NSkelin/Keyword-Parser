import {Meta, StoryObj} from "@storybook/react";
import {useRef} from "react";
import {Dialog} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const Mock = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>Show Dialog</button>
      <Dialog ref={dialogRef}>
        I am the dialog
        <button onClick={() => dialogRef.current?.close()}>Close me!</button>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <Mock />,
};
