import {Dialog} from "@/components/Dialog";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import {KeywordEditor} from "@/components/KeywordEditor";
import {KeywordList} from "@/components/KeywordList";
import type {Keyword} from "@/utils/types";
import {CSSProperties, useRef, useState} from "react";
import styles from "./KeywordDisplay.module.scss";

export interface KeywordDisplayProps extends SubmissionCallbacks {
  /** The title used to represent this section of keywords. */
  title?: string;
  /** The keywords to display */
  keywords: Keyword[];
  /** The color used for each keywords highlight color */
  highlightColor?: CSSProperties["backgroundColor"];
}

/** Displays a Keyword list with a group title for the keywords and
 * a fully functional editor to add, edit, or remove keywords.
 */
export function KeywordDisplay({keywords, title = "", highlightColor, onCreate, onUpdate, onDelete}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editorId, setEditorId] = useState<number>(-1);
  const [editorMode, setEditorMode] = useState<"Create" | "Edit">("Create");

  // Create a new array as the old one is readonly. Passes the list to <KeywordList /> which requires a mutable list (to sort it).
  const keywordsList = keywords.map(({...rest}) => {
    return {...rest};
  });

  /** Opens and sets the KeywordEditor dialog for creating new keywords. */
  function openCreate() {
    setEditorMode("Create");
    setEditorId(-1);
    dialogRef.current?.showModal();
  }

  /** Opens and sets the KeywordEditor dialog for editing existing keywords. */
  function openEdit(id: number) {
    if (dialogRef.current) {
      setEditorId(id);
      setEditorMode("Edit");
      dialogRef.current.showModal();
    }
  }

  function handleSubmit() {
    setEditorId(-1);
    dialogRef.current?.close();
  }

  function handleCancel() {
    // clear the form by reseting state when the user clickes cancel.
    // react resets the state when its key changes so we use a unique key that no other form will use.
    setEditorId(-2);
    dialogRef.current?.close();
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
      <Dialog ref={dialogRef}>
        <KeywordEditor
          key={editorId}
          id={editorId}
          collection={title}
          initialDisplayName={displayName}
          initialProficient={proficient}
          initialAliases={aliases}
          mode={editorMode}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Dialog>
      <div>
        <input type={"color"}></input>
        <button data-cy="create" onClick={openCreate}>
          Add keyword +
        </button>
      </div>
      <h2>{title}</h2>
      <KeywordList onEdit={openEdit} keywords={keywordsList} highlightColor={highlightColor} />
    </section>
  );
}
