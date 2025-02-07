import {Button} from "@/components/Button";
import {useClickOutside} from "@/customHooks";
import Image from "next/image";
import {useCallback, useEffect, useRef, useState} from "react";
import styles from "./InlineEdit.module.scss";

export interface InlineEditProps {
  value: string;
  /**
   * Ideally use a memoized function to prevent unnecessary eventlistener connection / disconnects.
   */
  onSave: (newValue: string) => void;
  /**
   * Ideally use a memoized function to prevent unnecessary eventlistener connection / disconnects.
   */
  onCancel?: () => void;
  type?: "text" | "number" | "textarea";
  children?: React.ReactNode;
}

export function InlineEdit({value, onSave, onCancel, type = "text", children}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
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
    setInputValue(value);
    if (onCancel) onCancel();
  }, [onCancel, value]);

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
