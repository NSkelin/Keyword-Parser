import {Dialog, KeywordEditor, KeywordList} from "@/components";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
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
function KeywordDisplay({keywords, title = "", highlightColor, onCreate, onUpdate, onDelete}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editorDisplayName, setEditorDisplayName] = useState("");
  const [editorId, setEditorId] = useState<number>(-1);
  const [editorProficient, setEditorProficient] = useState(false);
  const [aliases, setAliases] = useState<string[]>([]);
  const [editorMode, setEditorMode] = useState<"Create" | "Edit" | undefined>("Create");

  // Create a new array as the old one is readonly. Passes the list to <KeywordList /> which requires a mutable list (to sort it).
  const keywordsList = keywords.map(({...rest}) => {
    return {...rest};
  });

  /** Opens and sets the KeywordEditor dialog for creating new keywords. */
  function openCreate() {
    setEditorDisplayName("");
    setEditorMode("Create");
    setEditorProficient(false);
    setAliases([]);
    dialogRef.current?.showModal();
  }

  /** Opens and sets the KeywordEditor dialog for editing existing keywords. */
  function openEdit(id: number) {
    if (dialogRef.current) {
      const name = keywords.find((keyword) => keyword.id === id)?.displayName;
      if (name == null) return;
      setEditorDisplayName(name);
      setEditorId(id);
      setEditorMode("Edit");
      const keyword = keywords.find((keyword) => keyword.displayName === name);
      if (keyword?.aliases != null) {
        setEditorProficient(keyword.proficient);
        setAliases(keyword.aliases);
      }
      dialogRef.current.showModal();
    }
  }

  return (
    <section className={styles.container}>
      <Dialog ref={dialogRef}>
        <KeywordEditor
          aliases={aliases}
          collection={title}
          proficient={editorProficient}
          id={editorId}
          displayName={editorDisplayName}
          mode={editorMode}
          onAliasesChange={(aliases) => setAliases(aliases)}
          onDisplayNameChange={(e) => setEditorDisplayName(e.target.value)}
          onProficientChange={(e) => setEditorProficient(e.target.checked)}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSubmit={() => dialogRef.current?.close()}
          onCancel={() => dialogRef.current?.close()}
        />
      </Dialog>
      <div>
        <input type={"color"}></input>
        <button data-cy="kw-addKeyword" onClick={openCreate}>
          Add keyword +
        </button>
      </div>
      <h2>{title}</h2>
      <KeywordList onEdit={openEdit} keywords={keywordsList} highlightColor={highlightColor} />
    </section>
  );
}

export default KeywordDisplay;
