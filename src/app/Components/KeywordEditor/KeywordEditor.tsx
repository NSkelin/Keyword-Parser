import React, {useRef, forwardRef, useImperativeHandle, ChangeEventHandler} from "react";
import styles from "./KeywordEditor.module.scss";

type KeywordEditorRef = {
  showModal: () => void;
};

export type KeywordEditorProps = {
  defaultDisplayName: string;
  defaultAliases: string;
  collection: string;
  onAliasesChange: ChangeEventHandler<HTMLInputElement>;
  onDisplayNameChange: ChangeEventHandler<HTMLInputElement>;
};
const KeywordEditor = forwardRef<KeywordEditorRef, KeywordEditorProps>(function KeywordEditor(
  {defaultDisplayName, defaultAliases, collection, onAliasesChange, onDisplayNameChange}: KeywordEditorProps,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal() {
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
        },
      };
    },
    []
  );

  function handleDialogClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function handleSave() {
    // Handle updating the data
    fetch(`/api/${collection}/${defaultDisplayName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newAliases: defaultAliases}),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data updated successfully");
          handleDialogClose();
        } else {
          console.error("Failed to update data");
        }
      })
      .catch((error) => {
        console.error("Error occurred while updating data:", error);
      });
  }

  function handleDelete() {
    // Handle deleting the data
    fetch(`/api/${collection}/${defaultDisplayName}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data deleted successfully");
          handleDialogClose();
        } else {
          console.error("Failed to delete data");
        }
      })
      .catch((error) => {
        console.error("Error occurred while deleting data:", error);
      });
  }

  return (
    <dialog ref={dialogRef}>
      <h2>Update or Delete Data</h2>
      <label>
        Display Name:
        <input type="text" value={defaultDisplayName} onChange={onDisplayNameChange} />
      </label>
      <br />
      <label>
        Aliases (comma-separated):
        <input type="text" value={defaultAliases} onChange={onAliasesChange} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleDialogClose}>Cancel</button>
    </dialog>
  );
});

export default KeywordEditor;
