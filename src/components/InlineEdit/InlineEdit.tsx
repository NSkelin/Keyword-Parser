import Image from "next/image";
import {useState} from "react";
import styles from "./InlineEdit.module.scss";

export interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: "text" | "number" | "textarea";
  children?: React.ReactNode;
}

export function InlineEdit({value, onSave, type = "text", children}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const editSVG = <Image src="/edit.svg" alt="Edit icon" width={16} height={16} />;
  const closeSVG = <Image src="/close.svg" alt="Edit icon" width={16} height={16} />;
  const checkSVG = <Image src="/check.svg" alt="Edit icon" width={16} height={16} />;

  function handleSave() {
    onSave(inputValue);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setInputValue(value);
  }

  return (
    <div>
      {isEditing ? (
        <div>
          {type === "textarea" ? (
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
          ) : (
            <input type={type} value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
          )}
          <button onClick={handleSave}>{checkSVG}</button>
          <button onClick={handleCancel}>{closeSVG}</button>
        </div>
      ) : (
        <div className={styles.children} onClick={() => setIsEditing(true)}>
          {children}
          {editSVG}
        </div>
      )}
    </div>
  );
}
