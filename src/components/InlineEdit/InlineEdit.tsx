import {Button} from "@/components/Button";
import {useClickOutside} from "@/customHooks";
import Image from "next/image";
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import styles from "./InlineEdit.module.scss";

export interface InlineEditProps {
  /**
   * The inital value shown when the component enters edit mode.
   */
  defaultValue: string;
  /**
   * Ideally use a memoized function to prevent unnecessary eventlistener connection / disconnects.
   */
  onSave: (newValue: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Ideally use a memoized function to prevent unnecessary eventlistener connection / disconnects.
   */
  onCancel?: () => void;
  type?: "text" | "number" | "textarea";
  children?: React.ReactNode;
}

export function InlineEdit({defaultValue, onSave, onChange, onCancel, type = "text", children}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const inlineEdit = useRef(null);

  const editSVG = <Image src="/edit.svg" alt="Edit icon" width={16} height={16} />;
  const closeSVG = <Image src="/close.svg" alt="Edit icon" width={16} height={16} />;
  const checkSVG = <Image src="/check.svg" alt="Edit icon" width={16} height={16} />;

  const handleSave = useCallback(() => {
    onSave(inputValue);
    setIsEditing(false);
  }, [inputValue, onSave]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setInputValue(defaultValue);
    if (onCancel) onCancel();
  }, [onCancel, defaultValue]);

  useClickOutside(inlineEdit, handleCancel);
  useEffect(() => {
    // Save / close if enter / esc pressed while editing.
    const listener = (event: KeyboardEvent) => {
      if (!isEditing) return;
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleSave();
      } else if (event.code === "Escape") {
        handleCancel();
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSave, handleCancel, isEditing, onCancel]);

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
