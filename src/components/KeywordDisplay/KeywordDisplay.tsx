import {Button} from "@/components/Button";
import {DeleteCollectionFormDialog} from "@/components/DeleteCollectionFormDialog";
import {Dialog} from "@/components/Dialog";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import {KeywordEditor} from "@/components/KeywordEditor";
import {KeywordList} from "@/components/KeywordList";
import {PopoverPicker} from "@/components/PopoverPicker";
import {updateCollectionAction} from "@/utils/actions";
import type {Keyword} from "@/utils/types";
import Image from "next/image";
import {useState} from "react";
import {CreateKeywordFormDialog, CreateKeywordFormDialogProps} from "../CreateKeywordFormDialog";
import {InlineEdit} from "../InlineEdit";
import styles from "./KeywordDisplay.module.scss";

export interface KeywordDisplayProps extends SubmissionCallbacks {
  /** The title used to represent this section of keywords. */
  title?: string;
  /** The keywords to display */
  keywords: Keyword[];
  /** The color used for each keywords highlight color */
  highlightColor?: string;
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onKeywordCreate: CreateKeywordFormDialogProps["onCreate"];
  onCollectionUpdate: (collectionName: string, newCollectionName: string, newHighlightColor: string) => void;
  onCollectionDelete: (collectionName: string) => void;
}

/** Displays a Keyword list with a group title for the keywords and
 * a fully functional editor to add, edit, or remove keywords.
 */
export function KeywordDisplay({
  keywords,
  title = "",
  highlightColor,
  onKeywordCreate,
  onKeywordUpdate,
  onKeywordDelete,
  onCollectionUpdate,
  onCollectionDelete,
}: KeywordDisplayProps) {
  const [keywordEditDialogOpen, setKeywordEditDialogOpen] = useState(false);
  const [createKeywordFormDialogOpen, setCreateKeywordFormDialogOpen] = useState(false);
  const [collectionDeleteDialogOpen, setCollectionDeleteDialogOpen] = useState(false);
  const [editorId, setEditorId] = useState<number>(-1);
  const [color, setColor] = useState(highlightColor ?? "FFFFFF");

  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;
  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  // Create a new array as the old one is readonly. Passes the list to <KeywordList /> which requires a mutable list (to sort it).
  const keywordsList = keywords.map(({...rest}) => {
    return {...rest};
  });

  /** Opens and sets the KeywordEditor dialog for editing existing keywords. */
  function openKeywordEditDialog(id: number) {
    setEditorId(id);
    setKeywordEditDialogOpen(true);
  }

  function handleKeywordDialogSubmit() {
    setEditorId(-1);
    setKeywordEditDialogOpen(false);
  }

  function handleKeywordDialogCancel() {
    // clear the form by reseting state when the user clickes cancel.
    // react resets the state when its key changes so we use a unique key that no other form will use.
    setEditorId(-2);
    setKeywordEditDialogOpen(false);
  }

  function handleColorChange(newColor: string) {
    setColor(newColor);
  }

  async function handleCollectionNameUpdate(newCollectionName: string) {
    await updateCollectionAction(title, {newTitle: newCollectionName});
    onCollectionUpdate(title, newCollectionName, color);
  }

  async function handleCollectionColorUpdate(newHighlightColor: string) {
    await updateCollectionAction(title, {newHighlightColor});
    onCollectionUpdate(title, title, newHighlightColor);
  }

  function handleCollectionDelete() {
    setCollectionDeleteDialogOpen(false);
    onCollectionDelete(title);
  }

  function openCollectionDeleteDialog() {
    setCollectionDeleteDialogOpen(true);
  }

  function closeCollectionDeleteDialog() {
    setCollectionDeleteDialogOpen(false);
  }

  function handleKeywordCreate(...args: Parameters<CreateKeywordFormDialogProps["onCreate"]>) {
    setCreateKeywordFormDialogOpen(false);
    onKeywordCreate(...args);
  }

  function handleCreateKeywordCancel() {
    setCreateKeywordFormDialogOpen(false);
  }

  // get the initial data
  let displayName, aliases, proficient;

  if (editorId > 0) {
    const keyword = keywords.find((keyword) => keyword.id === editorId);
    if (keyword == null) throw new Error("Keyword not found!");
    ({displayName, aliases, proficient} = keyword);
  }
  return (
    <section data-cy="keywordDisplayComp" className={styles.container}>
      <CreateKeywordFormDialog
        collection={title}
        onCreate={handleKeywordCreate}
        onCancel={handleCreateKeywordCancel}
        open={createKeywordFormDialogOpen}
      ></CreateKeywordFormDialog>
      <Dialog title="" onClose={handleKeywordDialogCancel} open={keywordEditDialogOpen}>
        <KeywordEditor
          key={editorId}
          id={editorId}
          collection={title}
          initialDisplayName={displayName}
          initialProficient={proficient}
          initialAliases={aliases}
          onKeywordUpdate={onKeywordUpdate}
          onKeywordDelete={onKeywordDelete}
          onSubmit={handleKeywordDialogSubmit}
          onCancel={handleKeywordDialogCancel}
        />
      </Dialog>
      <DeleteCollectionFormDialog
        collectionName={title}
        open={collectionDeleteDialogOpen}
        onDelete={handleCollectionDelete}
        onCancel={closeCollectionDeleteDialog}
      />
      <div className={styles.titleContainer}>
        <PopoverPicker
          color={color}
          onChange={handleColorChange}
          onConfirm={(newColor) => void handleCollectionColorUpdate(newColor)}
        />
        <InlineEdit defaultValue={title} onSave={(newValue) => void handleCollectionNameUpdate(newValue)}>
          <h2>{title}</h2>
        </InlineEdit>
      </div>
      <Button data-cy="deleteButton" buttonStyle="delete" onClick={openCollectionDeleteDialog}>
        Delete collection {trashSVG}
      </Button>
      <Button
        data-cy="create"
        className={styles.button}
        buttonStyle="create"
        onClick={() => setCreateKeywordFormDialogOpen(true)}
      >
        New keyword {addSVG}
      </Button>
      <KeywordList onEdit={openKeywordEditDialog} keywords={keywordsList} highlightColor={color} />
    </section>
  );
}
