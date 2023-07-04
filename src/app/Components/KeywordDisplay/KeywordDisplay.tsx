import {CSSProperties, ChangeEvent, useRef, useState} from "react";
import KeywordEditorDialog from "../KeywordEditorDialog/KeywordEditorDialog";
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
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [aliases, setAliases] = useState("");
  const keywordsList: [string, number][] = [...keywords].map(([key, {count}]) => [key, count]);

  function showModal() {
    createDialogRef.current?.showModal();
  }

  function handleEdit(name: string) {
    if (editDialogRef.current) {
      setDisplayName(name);
      const aliases = keywords.get(name);
      if (aliases?.aliases != null) {
        setAliases(aliases.aliases.join(","));
      }
      editDialogRef.current.showModal();
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
      <KeywordEditorDialog ref={createDialogRef} collection={title} />
      <KeywordEditor
        ref={editDialogRef}
        collection={title}
        defaultAliases={aliases}
        defaultDisplayName={displayName}
        onAliasesChange={handleAliasesChange}
        onDisplayNameChange={handleDisplayNameChange}
      />
      <div>
        <input type={"color"}></input>
        <button onClick={showModal}>+</button>
      </div>
      <h2>{title}</h2>
      <KeywordList onEdit={handleEdit} keywords={keywordsList} highlightColor={highlightColor} />
    </section>
  );
}

export default KeywordDisplay;
