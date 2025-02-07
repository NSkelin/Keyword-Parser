import {Button} from "@/components/Button";
import {useClickOutside} from "@/customHooks";
import {useKeyup} from "@/customHooks/hooks";
import Image from "next/image";
import {ChangeEvent, useRef, useState} from "react";
import styles from "./InlineEdit.module.scss";

export interface InlineEditProps {
  /**
   * The inital value shown when the component enters edit mode.
   */
  defaultValue: string;
  onSave: (newValue: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel?: () => void;
  type?: "text" | "number" | "textarea";
  children?: React.ReactNode;
}

export function InlineEdit({defaultValue, onSave, onChange, onCancel, type = "text", children}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const inlineEdit = useRef(null);

  useClickOutside(inlineEdit, handleCancel);
  useKeyup("Enter", handleSave);
  useKeyup("Escape", handleCancel);

  const editSVG = <Image src="/edit.svg" alt="Edit icon" width={16} height={16} />;
  const closeSVG = <Image src="/close.svg" alt="Edit icon" width={16} height={16} />;
  const checkSVG = <Image src="/check.svg" alt="Edit icon" width={16} height={16} />;

  function handleSave() {
    onSave(inputValue);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setInputValue(defaultValue);
    if (onCancel) onCancel();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  }

  return (
    <div className={styles.container}>
      {isEditing ? (
        <div ref={inlineEdit} className={styles.editingContainer}>
          {type === "textarea" ? (
            <textarea value={inputValue} onChange={handleChange} autoFocus />
          ) : (
            <input type={type} value={inputValue} onChange={handleChange} autoFocus />
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
