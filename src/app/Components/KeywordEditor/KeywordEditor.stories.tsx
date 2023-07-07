import {Meta, StoryObj} from "@storybook/react";
import KeywordEditor from "./KeywordEditor";
import {useRef} from "react";

const meta: Meta<typeof KeywordEditor> = {
  component: KeywordEditor,
};
export default meta;
type Story = StoryObj<typeof KeywordEditor>;

const Testtter = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>Show editor</button>
      <KeywordEditor
        ref={dialogRef}
        aliases={["alias1", "alias2", "alias3", "alias4"]}
        collection={"collection"}
        displayName={"displayName"}
        displayNameID="oldDisplayName"
        onAliasesChange={() => {}}
        onDisplayNameChange={() => {}}
        onCreate={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <Testtter />,
};
