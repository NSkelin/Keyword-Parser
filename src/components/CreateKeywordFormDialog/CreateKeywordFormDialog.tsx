import {Button} from "@/components/Button";
import {CommaSeparatedInput} from "@/components/CommaSeparatedInput";
import {Input} from "@/components/Input";
import type {ValidationInputRules} from "@/utils";
import {validateInput} from "@/utils";
import Image from "next/image";
import {useState} from "react";
import {Dialog} from "../Dialog";
import styles from "./CreateKeywordFormDialog.module.scss";

const validationRules: ValidationInputRules = {
  required: true,
  minLen: 2,
  maxLen: 50,
};

export interface CreateKeywordFormDialogProps {
  /** The collection the currently edited keyword is apart of. Used to call the REST api. */
  collection: string;
  open?: boolean;
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onKeywordCreate: (
    keywordId: number,
    collectionName: string,
    displayName: string,
    proficient: boolean,
    aliases: string[],
  ) => void;
  /** Called upon a successful creation / update / deletion. */
  onSubmit?: () => void;
  /** Called when the user clicks the cancel button */
  onCancel?: () => void;
}
/** A \<dialog> form used to add / edit / delete keywords. */
export function CreateKeywordFormDialog({collection, open, onKeywordCreate, onSubmit, onCancel}: CreateKeywordFormDialogProps) {
  const [displayName, setDisplayName] = useState<string>("");
  const [proficient, setProficient] = useState<boolean>(false);
  const [aliases, setAliases] = useState<string[]>([]);
  const [CSIErrorMessage, setCSIErrorMessage] = useState<string | undefined>(undefined);
  const displayNameValidation = validateInput(displayName, validationRules);

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

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
   * Sends a POST request to the API to create a new keyword.
   * @returns The newly created keywords ID.
   */
  async function requestKeywordCreate() {
    try {
      if (!validateForm()) return;
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
        onKeywordCreate(jsonData.id, collection, displayName, proficient, aliases);
        if (onSubmit) onSubmit();
      } else {
        throw new Error("Bad id");
      }
    } catch (error) {
      console.error("Error occurred while adding keyword:", error);
      return;
    }
  }

  return (
    <Dialog title="" onCancel={onCancel} open={open}>
      <div data-cy="keywordEditorComp" className={styles.container}>
        <div className={styles.inputs}>
          <h2>Create</h2>
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
          <Button buttonStyle="submit" data-cy="submit" onClick={() => void requestKeywordCreate()}>
            Create {addSVG}
          </Button>
          <Button data-cy="cancel" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
