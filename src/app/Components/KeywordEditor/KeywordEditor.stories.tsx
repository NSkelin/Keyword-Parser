import {Meta, StoryObj} from "@storybook/react";
import KeywordEditor from "./KeywordEditor";

const meta: Meta<typeof KeywordEditor> = {
  component: KeywordEditor,
};
export default meta;
type Story = StoryObj<typeof KeywordEditor>;

export const Default: Story = {
  args: {
    id: 0,
    aliases: ["alias1", "alias2", "alias3", "alias4"],
    collection: "collection",
    displayName: "displayName",
    proficient: false,
    onProficientChange: () => {},
    onAliasesChange: () => {},
    onDisplayNameChange: () => {},
    onCreate: () => {},
    onDelete: () => {},
    onUpdate: () => {},
    onSubmit: () => {},
    onCancel: () => {},
  },
};
