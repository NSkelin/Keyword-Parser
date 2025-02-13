import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import {KeywordEditor} from "@/components/KeywordEditor";
import {KeywordList} from "@/components/KeywordList";
import {PopoverPicker} from "@/components/PopoverPicker";
import {deleteCollectionAction, updateCollectionAction} from "@/utils/actions";
import type {Keyword} from "@/utils/types";
import Image from "next/image";
import {useState} from "react";
import {InlineEdit} from "../InlineEdit";
import styles from "./KeywordDisplay.module.scss";

export interface KeywordDisplayProps extends SubmissionCallbacks {
  /** The title used to represent this section of keywords. */
  title?: string;
  /** The keywords to display */
  keywords: Keyword[];
  /** The color used for each keywords highlight color */
  highlightColor?: string;

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
  const [collectionDeleteDialogOpen, setCollectionDeleteDialogOpen] = useState(false);
  const [editorId, setEditorId] = useState<number>(-1);
  const [editorMode, setEditorMode] = useState<"Create" | "Edit">("Create");
  const [color, setColor] = useState(highlightColor ?? "FFFFFF");

  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;
  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  // Create a new array as the old one is readonly. Passes the list to <KeywordList /> which requires a mutable list (to sort it).
  const keywordsList = keywords.map(({...rest}) => {
    return {...rest};
  });

  /** Opens and sets the KeywordEditor dialog for creating new keywords. */
  function openKeywordCreateDialog() {
    setEditorMode("Create");
    setEditorId(-1);
    setKeywordEditDialogOpen(true);
  }

  /** Opens and sets the KeywordEditor dialog for editing existing keywords. */
  function openKeywordEditDialog(id: number) {
    setEditorId(id);
    setEditorMode("Edit");
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

  // get the initial data
  let displayName, aliases, proficient;

  if (editorId > 0) {
    const keyword = keywords.find((keyword) => keyword.id === editorId);
    if (keyword == null) throw new Error("Keyword not found!");
    ({displayName, aliases, proficient} = keyword);
  }
  return (
    <section data-cy="keywordDisplayComp" className={styles.container}>
      <Dialog onClose={handleKeywordDialogCancel} open={keywordEditDialogOpen}>
        <KeywordEditor
          key={editorId}
          id={editorId}
          collection={title}
          initialDisplayName={displayName}
          initialProficient={proficient}
          initialAliases={aliases}
          mode={editorMode}
          onKeywordCreate={onKeywordCreate}
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
      <Button buttonStyle="delete" onClick={openCollectionDeleteDialog}>
        Delete collection {trashSVG}
      </Button>
      <Button data-cy="create" className={styles.button} buttonStyle="create" onClick={openKeywordCreateDialog}>
        New keyword {addSVG}
      </Button>
      <KeywordList onEdit={openKeywordEditDialog} keywords={keywordsList} highlightColor={color} />
    </section>
  );
}

interface DeleteCollectionFormDialogProps {
  collectionName: string;
  onDelete: () => void;
  onCancel: () => void;
  open?: boolean;
}

function DeleteCollectionFormDialog({collectionName, onDelete, onCancel, open}: DeleteCollectionFormDialogProps) {
  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;

  async function handleCollectionDelete() {
    await deleteCollectionAction(collectionName);
    onDelete();
  }

  return (
    <Dialog onCancel={onCancel} open={open}>
      <form action={handleCollectionDelete} className={styles.form}>
        <div className={styles.warning}>
          <h3>Are you sure you want to delete this collection</h3>
          <b>{collectionName}</b>
          <span>This action cannot be undone.</span>
        </div>
        <div className={styles.actionBar}>
          <Button buttonStyle="delete" type="submit">
            Yes, delete forever {trashSVG}
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
