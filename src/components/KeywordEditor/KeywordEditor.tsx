import {Button} from "@/components/Button";
import {CommaSeparatedInput} from "@/components/CommaSeparatedInput";
import {Input} from "@/components/Input";
import type {ValidationInputRules} from "@/utils";
import {validateInput} from "@/utils";
import Image from "next/image";
import {useState} from "react";
import styles from "./KeywordEditor.module.scss";

const validationRules: ValidationInputRules = {
  required: true,
  minLen: 2,
  maxLen: 50,
};

export interface SubmissionCallbacks {
  /** A callback for when a user successfully updates a keyword. Should be used to update state to keep the list relevant. */
  onKeywordUpdate: (
    keywordId: number,
    collectionName: string,
    newDisplayName: string,
    newProficiency: boolean,
    newAliases: string[],
  ) => void;
  /** A callback for when a user successfully deletes a keyword. Should be used to update state to keep the list relevant. */
  onKeywordDelete: (keywordId: number, collectionName: string) => void;
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
  /** Called upon a successful creation / update / deletion. */
  onSubmit?: () => void;
  /** Called when the user clicks the cancel button */
  onCancel?: () => void;
}
/** A \<dialog> form used to add / edit / delete keywords. */
export function KeywordEditor({
  id,
  initialDisplayName = "",
  collection,
  initialProficient = false,
  initialAliases = [],
  onKeywordUpdate,
  onKeywordDelete,
  onSubmit,
  onCancel,
}: KeywordEditorProps) {
  const [displayName, setDisplayName] = useState<string>(initialDisplayName);
  const [proficient, setProficient] = useState<boolean>(initialProficient);
  const [aliases, setAliases] = useState<string[]>(initialAliases);
  const [CSIErrorMessage, setCSIErrorMessage] = useState<string | undefined>(undefined);
  const displayNameValidation = validateInput(displayName, validationRules);

  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={16} height={16} />;

  function validateForm() {
    let valid = true;

    if (displayNameValidation.valid === false) {
      valid = false;
    }

    if (aliases.length <= 0) {
      valid = false;
      setCSIErrorMessage("Atleast 1 alias is required.");
    }

    return valid;
  }

  function handleCSIChange(aliases: string[]) {
    setAliases(aliases);
    setCSIErrorMessage("");
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

  async function handleSubmit(type: "Update" | "Delete") {
    switch (type) {
      case "Update":
        try {
          if (!validateForm()) return;
          await requestKeywordUpdate();
          onKeywordUpdate(id, collection, displayName, proficient, aliases);
        } catch (error) {
          console.error("Error occurred while updating keyword:", error);
          return;
        }
        break;

      case "Delete":
        try {
          await requestKeywordDelete();
          onKeywordDelete(id, collection);
        } catch (error) {
          console.error("Error occurred while deleting keyword:", error);
          return;
        }
        break;
    }
    if (onSubmit) onSubmit();
  }

  return (
    <div data-cy="keywordEditorComp" className={styles.container}>
      <div className={styles.inputs}>
        <h2>Edit or delete the keyword</h2>
        <Input
          label="Display Name"
          errorMessage={displayNameValidation.valid ? undefined : displayNameValidation.error}
          required={true}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label className={styles.checkbox}>
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
          onInputChange={handleCSIChange}
          required={true}
          errorMessage={CSIErrorMessage}
        />
      </div>
      <div className={styles.actionBar}>
        <Button buttonStyle="submit" data-cy="submit" onClick={() => void handleSubmit("Update")}>
          Save
        </Button>
        <div>
          <Button buttonStyle="delete" data-cy="delete" onClick={() => void handleSubmit("Delete")}>
            Delete {trashSVG}
          </Button>
          <Button data-cy="cancel" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
