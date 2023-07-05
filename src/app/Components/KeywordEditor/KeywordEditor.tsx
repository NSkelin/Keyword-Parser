import React, {useRef, forwardRef, useImperativeHandle, ChangeEventHandler} from "react";
import styles from "./KeywordEditor.module.scss";

type KeywordEditorRef = {
  showModal: () => void;
};

export type KeywordEditorProps = {
  oldDisplayName: string;
  displayName: string;
  collection: string;
  aliases: string;
  mode?: "Create" | "Edit";
  onAliasesChange: ChangeEventHandler<HTMLInputElement>;
  onDisplayNameChange: ChangeEventHandler<HTMLInputElement>;
  onCreate: (collectionName: string, displayName: string, aliases: string[]) => void;
  onUpdate: (collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) => void;
  onDelete: (collectionName: string, displayName: string) => void;
};
const KeywordEditor = forwardRef<KeywordEditorRef, KeywordEditorProps>(function KeywordEditor(
  {
    oldDisplayName,
    displayName,
    collection,
    aliases,
    mode = "Create",
    onAliasesChange,
    onDisplayNameChange,
    onCreate,
    onUpdate,
    onDelete,
  }: KeywordEditorProps,
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

  function handleCreate() {
    fetch(`/api/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({displayName: displayName, aliases: aliases}),
    })
      .then((response) => {
        if (response.ok) {
          handleDialogClose();
          onCreate(collection, displayName, aliases.split(","));
        } else {
          console.error("Failed to add keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while adding keyword:", error);
      });
  }

  function handleUpdate() {
    fetch(`/api/${collection}/${oldDisplayName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newDisplayName: displayName, newAliases: aliases}),
    })
      .then((response) => {
        if (response.ok) {
          handleDialogClose();
          onUpdate(collection, oldDisplayName, displayName, aliases.split(","));
        } else {
          console.error("Failed to update keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while updating keyword:", error);
      });
  }

  function handleDelete() {
    fetch(`/api/${collection}/${displayName}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          handleDialogClose();
          onDelete(collection, displayName);
        } else {
          console.error("Failed to delete keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while deleting keyword:", error);
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
          <button onClick={handleUpdate}>Save</button>
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
        <input type="text" value={displayName} onChange={onDisplayNameChange} />
      </label>
      <br />
      <label>
        Aliases (comma-separated):
        <input type="text" value={aliases} onChange={onAliasesChange} />
      </label>
      <br />
      <div className={styles.buttonWrap}>{buttons()}</div>
    </dialog>
  );
});

export default KeywordEditor;
