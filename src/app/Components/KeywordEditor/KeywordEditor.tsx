import {CommaSeparatedInput, Input} from "@/components";
import {useState} from "react";
import styles from "./KeywordEditor.module.scss";

export interface SubmissionCallbacks {
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (keywordId: number, collectionName: string, displayName: string, proficient: boolean, aliases: string[]) => void;
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onUpdate: (
    keywordId: number,
    collectionName: string,
    newDisplayName: string,
    newProficiency: boolean,
    newAliases: string[],
  ) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onDelete: (keywordId: number, collectionName: string) => void;
}

/**
 * Validates an \<input /> fields text value.
 * @returns the error message or null for no errors.
 */
export function validateInput(input: string) {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return "Cannot be empty";
  }

  if (trimmedInput.length < 2 || trimmedInput.length > 50) {
    return "Must be 2 - 50 characters long";
  }

  const matches = trimmedInput.match(/[^\w ]/g);
  const uniqueMatches = [...new Set(matches)];

  if (uniqueMatches.length > 0) {
    let matchStr = "";
    for (const match of uniqueMatches) {
      matchStr = matchStr + match + " ";
    }
    return `Invalid characters: ${matchStr}`;
  }

  return null; // Validation passed
}

export interface KeywordEditorProps extends SubmissionCallbacks {
  /** A keywords unique identifier.
   * Only used in edit mode so technically optional if you dont plan on using edit mode.  */
  id: number;
  /** The collection the currently edited keyword is apart of. Used to call the REST api. */
  collection: string;
  /** The value for the \<input> representing the currently edited keywords displayName. */
  initialDisplayName?: string;
  /** Controls if the proficient checkbox input is checked or not. */
  initialProficient?: boolean;
  /** The list of aliases shown under the aliases \<input>. Each alias is represented by a clickable box underneath
   * the input allowing users to delete existing keywords easily. Requires onAliasesChange to function properly. */
  initialAliases?: string[];
  /** Changes how the dialog's title and buttons are rendered. "Create" has two buttons, one to create a new keyword and another to cancel.
   * "Edit" has three buttons, one to save changes, one to delete the keyword, and another to cancel any changes.*/
  mode?: "Create" | "Edit";
  /** Called upon a successful creation / update / deletion. */
  onSubmit?: () => void;
  /** Called when the user clicks the cancel button */
  onCancel?: () => void;
}
/** A \<dialog> form used to add / edit / delete keywords. */
function KeywordEditor({
  id,
  initialDisplayName = "",
  collection,
  initialProficient = false,
  initialAliases = [],
  mode = "Create",
  onCreate,
  onUpdate,
  onDelete,
  onSubmit,
  onCancel,
}: KeywordEditorProps) {
  const [displayName, setDisplayName] = useState<string>(initialDisplayName);
  const [proficient, setProficient] = useState<boolean>(initialProficient);
  const [aliases, setAliases] = useState<string[]>(initialAliases);
  const displayNameErrorMessage = validateInput(displayName) ?? undefined; // convert null to undefined for <Input />

  /**
   * Sends a POST request to the API to create a new keyword.
   * @returns The newly created keywords ID.
   */
  async function requestKeywordCreate() {
    const response = await fetch(`/api/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({displayName: displayName, proficient: proficient, aliases: aliases}),
    });

    if (!response.ok) throw new Error("Bad response");

    const jsonData: unknown = await response.json();

    if (typeof jsonData === "object" && jsonData != null && "id" in jsonData && typeof jsonData.id === "number") {
      return jsonData.id;
    } else {
      throw new Error("Bad id");
    }
  }

  /**
   * Sends a PUT request to the API to update a keywords information.
   */
  async function requestKeywordUpdate() {
    const response = await fetch(`/api/${collection}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newDisplayName: displayName, proficient, newAliases: aliases}),
    });
    if (!response.ok) throw new Error("Failed to update keyword");
  }

  /**
   * Sends a DELETE request to the API to delete a keywords.
   */
  async function requestKeywordDelete() {
    const response = await fetch(`/api/${collection}/${id}`, {method: "DELETE"});
    if (!response.ok) throw new Error("Failed to delete keyword");
  }

  async function handleSubmit(type: "Create" | "Update" | "Delete") {
    switch (type) {
      case "Create":
        try {
          if (displayNameErrorMessage !== null) return;
          const id = await requestKeywordCreate();
          onCreate(id, collection, displayName, proficient, aliases);
        } catch (error) {
          console.error("Error occurred while adding keyword:", error);
        }
        break;

      case "Update":
        try {
          if (displayNameErrorMessage !== null) return;
          await requestKeywordUpdate();
          onUpdate(id, collection, displayName, proficient, aliases);
        } catch (error) {
          console.error("Error occurred while updating keyword:", error);
        }
        break;

      case "Delete":
        try {
          await requestKeywordDelete();
          onDelete(id, collection);
        } catch (error) {
          console.error("Error occurred while deleting keyword:", error);
        }
        break;
    }
    if (onSubmit) onSubmit();
  }

  // Create the editors title and available buttons depending on if its creating a new keyword or editing and existing one.
  const title = mode === "Create" ? "Create a new keyword" : "Edit or delete the keyword";
  const buttons = () => {
    if (mode === "Create") {
      return (
        <>
          <button data-cy="submit" onClick={() => void handleSubmit("Create")}>
            Create
          </button>
          <button data-cy="cancel" onClick={onCancel}>
            Cancel
          </button>
        </>
      );
    } else if (mode === "Edit") {
      return (
        <>
          <button data-cy="submit" onClick={() => void handleSubmit("Update")}>
            Save
          </button>
          <div>
            <button data-cy="delete" onClick={() => void handleSubmit("Delete")}>
              Delete
            </button>
            <button data-cy="cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div data-cy="kw-form" className={styles.container}>
      <div className={styles.inputs}>
        <h2>{title}</h2>
        <Input
          label="Display Name"
          errorMessage={displayNameErrorMessage}
          required={true}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label>
          Proficient
          <input
            data-cy="proficient"
            type="checkbox"
            checked={proficient}
            onChange={(e) => setProficient(e.target.checked)}
          ></input>
        </label>
        <CommaSeparatedInput
          label={"Aliases (comma-separated)"}
          savedInputs={aliases}
          onInputChange={(aliases) => setAliases(aliases)}
          inputValidation={validateInput}
          required={true}
        />
      </div>
      <div className={styles.actionBar}>{buttons()}</div>
    </div>
  );
}

export default KeywordEditor;
