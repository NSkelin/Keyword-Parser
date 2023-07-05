import {CSSProperties, ChangeEvent, useRef, useState} from "react";
import KeywordList from "../KeywordList/KeywordList";
import styles from "./KeywordDisplay.module.scss";
import KeywordEditor from "../KeywordEditor/KeywordEditor";

export type KeywordDisplayProps = {
  title: string;
  // keywords: {name: string; count: number; aliases: string}[];
  keywords: Map<string, {count: number; aliases: string[]}>;
  highlightColor: CSSProperties["backgroundColor"];
};
function KeywordDisplay({keywords, title, highlightColor}: KeywordDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [aliases, setAliases] = useState("");
  const [editorMode, setEditorMode] = useState<"Create" | "Edit" | undefined>("Create");
  const keywordsList: [string, number][] = [...keywords].map(([key, {count}]) => [key, count]);

  function handleCreate() {
    setDisplayName("");
    setEditorMode("Create");
    setAliases("");
    dialogRef.current?.showModal();
  }

  function handleEdit(name: string) {
    if (dialogRef.current) {
      setDisplayName(name);
      setEditorMode("Edit");
      const aliases = keywords.get(name);
      if (aliases?.aliases != null) {
        setAliases(aliases.aliases.join(","));
      }
      dialogRef.current.showModal();
    }
  }

  function handleDisplayNameChange(e: ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value);
  }

  function handleAliasesChange(e: ChangeEvent<HTMLInputElement>) {
    setAliases(e.target.value);
  }

  return (
    <section className={styles.wrapper}>
      <KeywordEditor
        ref={dialogRef}
        collection={title}
        defaultAliases={aliases}
        defaultDisplayName={displayName}
        mode={editorMode}
        onAliasesChange={handleAliasesChange}
        onDisplayNameChange={handleDisplayNameChange}
      />
      <div>
        <input type={"color"}></input>
        <button onClick={handleCreate}>Add keyword +</button>
      </div>
      <h2>{title}</h2>
      <KeywordList onEdit={handleEdit} keywords={keywordsList} highlightColor={highlightColor} />
    </section>
  );
}

export default KeywordDisplay;
