import {CSSProperties, ChangeEvent, useRef, useState} from "react";
import KeywordList from "../KeywordList/KeywordList";
import styles from "./KeywordDisplay.module.scss";
import KeywordEditor from "../KeywordEditor/KeywordEditor";

export type KeywordDisplayProps = {
  /** The title used to represent this section of keywords. */
  title?: string;
  /** A hashmap containing all the keywords to display.
   * The hashmaps key represents a keywords name, and the value is an object containing a keywords instance count and aliases.
   */
  keywords: Map<string, {count: number; aliases: string[]}>;
  /** The color used for each keywords highlight color */
  highlightColor?: CSSProperties["backgroundColor"];
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (collectionName: string, displayName: string, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (collectionName: string, displayName: string) => void;
};
/** Displays a Keyword list with a group title for the keywords and
 * a fully functional editor to add, edit, or remove keywords.
 */
function KeywordDisplay({keywords, title = "", highlightColor, onCreate, onUpdate, onDelete}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editorDisplayName, setEditorDisplayName] = useState("");
  const [editorId, setEditorId] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);
  const [editorMode, setEditorMode] = useState<"Create" | "Edit" | undefined>("Create");
  const keywordsList: [string, number][] = [...keywords].map(([key, {count}]) => [key, count]);

  /** Opens and sets the KeywordEditor dialog for creating new keywords. */
  function openCreate() {
    setEditorDisplayName("");
    setEditorMode("Create");
    setAliases([]);
    dialogRef.current?.showModal();
  }

  /** Opens and sets the KeywordEditor dialog for editing existing keywords. */
  function openEdit(name: string) {
    if (dialogRef.current) {
      setEditorDisplayName(name);
      setEditorId(name);
      setEditorMode("Edit");
      const aliases = keywords.get(name);
      if (aliases?.aliases != null) {
        setAliases(aliases.aliases);
      }
      dialogRef.current.showModal();
    }
  }

  return (
    <section className={styles.container}>
      <KeywordEditor
        ref={dialogRef}
        aliases={aliases}
        collection={title}
        oldDisplayName={editorId}
        displayName={editorDisplayName}
        mode={editorMode}
        onAliasesChange={(aliases) => setAliases(aliases)}
        onDisplayNameChange={(e) => setEditorDisplayName(e.target.value)}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      <div>
        <input type={"color"}></input>
        <button onClick={openCreate}>Add keyword +</button>
      </div>
      <h2>{title}</h2>
      <KeywordList onEdit={openEdit} keywords={keywordsList} highlightColor={highlightColor} />
    </section>
  );
}

export default KeywordDisplay;
