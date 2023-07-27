import React, {ChangeEventHandler} from "react";
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

export interface KeywordEditorProps {
  /** The original displayName property before any editing occurs. Acts as the ID when updating the database.
   * Only used in edit mode so technically optional if you dont plan on using edit mode.  */
  displayNameID: string;
  /** The value for the \<input> representing the currently edited keywords displayName. */
  displayName: string;
  /** The collection the currently edited keyword is apart of. Used to call the REST api. */
  collection: string;
  /** Controls if the proficient checkbox input is checked or not. */
  proficient: boolean;
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
  /** A callback for the proficient checkbox onChange event. The proficient property is the \<input>s checked value so the result must be stored in state. */
  onProficientChange: ChangeEventHandler<HTMLInputElement>;
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (collectionName: string, displayName: string, proficient: boolean, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (
    collectionName: string,
    displayName: string,
    newDisplayName: string,
    proficient: boolean,
    newAliases: string[],
  ) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (collectionName: string, displayName: string) => void;
  /** Called upon a successful creation / update / deletion. */
  onSubmit?: () => void;
  /** Called when the user clicks the cancel button */
  onCancel?: () => void;
}
/** A \<dialog> form used to add / edit / delete keywords. */
function KeywordEditor({
  displayNameID,
  displayName,
  collection,
  proficient,
  aliases,
  mode = "Create",
  onAliasesChange,
  onDisplayNameChange,
  onProficientChange,
  onCreate,
  onUpdate,
  onDelete,
  onSubmit,
  onCancel,
}: KeywordEditorProps) {
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
      body: JSON.stringify({displayName: displayName, proficient: proficient, aliases: aliases}),
    })
      .then((response) => {
        if (response.ok) {
          if (onSubmit) onSubmit();
          onCreate(collection, displayName, proficient, aliases);
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
      body: JSON.stringify({newDisplayName: displayName, proficient, newAliases: aliases}),
    })
      .then((response) => {
        if (response.ok) {
          if (onSubmit) onSubmit();
          onUpdate(collection, displayNameID, displayName, proficient, aliases);
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
          if (onSubmit) onSubmit();
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
          <button onClick={onCancel}>Cancel</button>
        </>
      );
    } else if (mode === "Edit") {
      return (
        <>
          <button onClick={handleUpdate}>Save</button>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <h2>{title}</h2>
        <label>
          Display Name
          <input type="text" value={displayName} onChange={onDisplayNameChange} />
        </label>
        <label>
          Proficient
          <input type="checkbox" checked={proficient} onChange={onProficientChange}></input>
        </label>
        <CommaSeparatedInput label={"Aliases (comma-separated)"} savedInputs={aliases} onInputChange={onAliasesChange} />
      </div>
      <div className={styles.actionBar}>{buttons()}</div>
    </div>
  );
}

export default KeywordEditor;
