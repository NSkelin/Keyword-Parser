import {CSSProperties, ChangeEvent, useRef, useState} from "react";
import KeywordList from "../KeywordList/KeywordList";
import styles from "./KeywordDisplay.module.scss";
import KeywordEditor from "../KeywordEditor/KeywordEditor";

export type KeywordDisplayProps = {
  title: string;
  keywords: Map<string, {count: number; aliases: string[]}>;
  highlightColor: CSSProperties["backgroundColor"];
  onCreate: (collectionName: string, displayName: string, aliases: string[]) => void;
  onUpdate: (collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) => void;
  onDelete: (collectionName: string, displayName: string) => void;
};
function KeywordDisplay({keywords, title, highlightColor, onCreate, onUpdate, onDelete}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editorDisplayName, setEditorDisplayName] = useState("");
  const [editorId, setEditorId] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);
  const [editorMode, setEditorMode] = useState<"Create" | "Edit" | undefined>("Create");
  const keywordsList: [string, number][] = [...keywords].map(([key, {count}]) => [key, count]);

  function openCreate() {
    setEditorDisplayName("");
    setEditorMode("Create");
    setAliases([]);
    dialogRef.current?.showModal();
  }

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

  function handleDisplayNameChange(e: ChangeEvent<HTMLInputElement>) {
    setEditorDisplayName(e.target.value);
  }

  function handleAliasesChange(aliases: string[]) {
    setAliases(aliases);
  }
  return (
    <section className={styles.wrapper}>
      <KeywordEditor
        ref={dialogRef}
        aliases={aliases}
        collection={title}
        oldDisplayName={editorId}
        displayName={editorDisplayName}
        mode={editorMode}
        onAliasesChange={handleAliasesChange}
        onDisplayNameChange={handleDisplayNameChange}
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
