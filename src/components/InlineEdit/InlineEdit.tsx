import {Button} from "@/components/Button";
import {useClickOutside} from "@/customHooks";
import Image from "next/image";
import {useRef, useState} from "react";
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
  const inlineEdit = useRef(null);

  useClickOutside(inlineEdit, handleCancel);

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
    <div className={styles.container}>
      {isEditing ? (
        <div ref={inlineEdit} className={styles.editingContainer}>
          {type === "textarea" ? (
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
          ) : (
            <input type={type} value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
          )}
          <div className={styles.buttonContainer}>
            <Button buttonStyle="submit" iconOnly onClick={handleSave}>
              {checkSVG}
            </Button>
            <Button iconOnly onClick={handleCancel}>
              {closeSVG}
            </Button>
          </div>
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
