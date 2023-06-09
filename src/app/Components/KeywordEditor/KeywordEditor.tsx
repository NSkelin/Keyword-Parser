import React, {useRef, forwardRef, useImperativeHandle, ChangeEventHandler} from "react";
import styles from "./KeywordEditor.module.scss";
import CommaSeparatedInput from "../CommaSeparatedInput/CommaSeparatedInput";

export function validateInput(input: string | string[]) {
  if (Array.isArray(input)) {
    for (const val of input) {
      if (val.length <= 1) return false;
    }
    return true;
  } else {
    if (input.length <= 1) return false;
    else return true;
  }
}

type KeywordEditorRef = {
  showModal: () => void;
};

export type KeywordEditorProps = {
  /** The original displayName property before any editing occurs. Acts as the ID when updating the database.
   * Only used in edit mode so technically optional if you dont plan on using edit mode.  */
  displayNameID: string;
  /** The value for the \<input> representing the currently edited keywords displayName. */
  displayName: string;
  /** The collection the currently edited keyword is apart of. Used to call the REST api. */
  collection: string;
  /** The list of aliases shown under the aliases \<input>. Each alias is represented by a clickable box underneath
   * the input allowing users to delete existing keywords easily. Requires onAliasesChange to function properly. */
  aliases: string[];
  /** Changes how the dialog's title and buttons are rendered. "Create" has two buttons, one to create a new keyword and another to cancel.
   * "Edit" has three buttons, one to save changes, one to delete the keyword, and another to cancel any changes.*/
  mode?: "Create" | "Edit";
  /** A callback for when the user adds or removes an alias from the editor. Used for updating state. */
  onAliasesChange: (aliases: string[]) => void;
  /** A callback for the displayName \<input> onChange event. The displayName property is the \<input>s value so the result must be stored in state. */
  onDisplayNameChange: ChangeEventHandler<HTMLInputElement>;
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (collectionName: string, displayName: string, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (collectionName: string, displayName: string, newDisplayName: string, newAliases: string[]) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (collectionName: string, displayName: string) => void;
};
/** A \<dialog> form used to add / edit / delete keywords. */
const KeywordEditor = forwardRef<KeywordEditorRef, KeywordEditorProps>(function KeywordEditor(
  {
    displayNameID,
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

  /** Exposes the dialogs showModal() function to the forwarded ref. Only exposed methods can be called. */
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

  /** Closes the dialog. Uses the dialogs built in close() method. */
  function handleDialogClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  /**
   * Handles the response to a user creating a keyword, by verifying input, and handling errors.
   * Sends the request to the REST api and upon success closes the editor and calls the passed in callback function.
   * Allowing the app to use the data to update the state, update the database, etc.
   */
  function handleCreate() {
    if (!validateInput(displayName) && !validateInput(aliases)) return;
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
          onCreate(collection, displayName, aliases);
        } else {
          console.error("Failed to add keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while adding keyword:", error);
      });
  }

  /**
   * Handles the response to a user updating a keyword, by verifying input, and handling errors.
   * Sends the request to the REST api and upon success closes the editor and calls the passed in callback function.
   * Allowing the app to use the data to update the state, update the database, etc.
   */
  function handleUpdate() {
    if (!validateInput(displayName) && !validateInput(aliases)) return;
    fetch(`/api/${collection}/${displayNameID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newDisplayName: displayName, newAliases: aliases}),
    })
      .then((response) => {
        if (response.ok) {
          handleDialogClose();
          onUpdate(collection, displayNameID, displayName, aliases);
        } else {
          console.error("Failed to update keyword");
        }
      })
      .catch((error) => {
        console.error("Error occurred while updating keyword:", error);
      });
  }

  /**
   * Handles the response to a user deleting a keyword, by verifying input, and handling errors.
   * Sends the request to the REST api and upon success closes the editor and calls the passed in callback function.
   * Allowing the app to use the data to update the state, update the database, etc.
   */
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

  // Create the editors title and available buttons depending on if its creating a new keyword or editing and existing one.
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
      <div className={styles.container}>
        <div className={styles.inputs}>
          <h2>{title}</h2>
          <label>
            Display Name
            <input type="text" value={displayName} onChange={onDisplayNameChange} />
          </label>
          <CommaSeparatedInput label={"Aliases (comma-separated)"} savedInputs={aliases} onInputChange={onAliasesChange} />
        </div>
        <div className={styles.actionBar}>{buttons()}</div>
      </div>
    </dialog>
  );
});

export default KeywordEditor;
