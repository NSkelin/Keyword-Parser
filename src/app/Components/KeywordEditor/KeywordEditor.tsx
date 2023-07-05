import React, {useRef, forwardRef, useImperativeHandle, ChangeEventHandler} from "react";
import styles from "./KeywordEditor.module.scss";

type KeywordEditorRef = {
  showModal: () => void;
};

export type KeywordEditorProps = {
  defaultDisplayName: string;
  defaultAliases: string;
  collection: string;
  mode?: "Create" | "Edit";
  onAliasesChange: ChangeEventHandler<HTMLInputElement>;
  onDisplayNameChange: ChangeEventHandler<HTMLInputElement>;
};
const KeywordEditor = forwardRef<KeywordEditorRef, KeywordEditorProps>(function KeywordEditor(
  {defaultDisplayName, defaultAliases, collection, mode = "Create", onAliasesChange, onDisplayNameChange}: KeywordEditorProps,
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

  function handleCreate() {
    console.log("test");
    // Handle updating the data
    fetch(`/api/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({displayName: defaultDisplayName, aliases: defaultAliases}),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Keyword created successfully");
          handleDialogClose();
        } else {
          console.error("Failed to create keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while creating keyword:", error);
      });
  }

  const title = mode === "Create" ? "Create a new keyword" : "Edit or delete the keyword";
  const buttons = () => {
    if (mode === "Create") {
      return (
        <>
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleDialogClose}>Cancel</button>
        </>
      );
    } else if (mode === "Edit") {
      return (
        <>
          <button onClick={handleSave}>Save</button>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleDialogClose}>Cancel</button>
          </div>
        </>
      );
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <h2 className={styles.title}>{title}</h2>
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
      <div className={styles.buttonWrap}>{buttons()}</div>
    </dialog>
  );
});

export default KeywordEditor;
