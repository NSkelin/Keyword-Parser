import {Input} from "@/components/Input";
import type {ValidationInputRules} from "@/utils";
import {validateInput} from "@/utils";
import {ChangeEvent, useState} from "react";
import styles from "./CommaSeparatedInput.module.scss";
const validationRules: ValidationInputRules = {
  required: true,
  minLen: 2,
  maxLen: 50,
};

export interface CommaSeparatedInputProps {
  /** Label for the input. */
  label?: string;
  /** Adds a red "*" character directly infront of the label to indicate this input field is required.  */
  required?: boolean;
  /** The list of words shown below the input. */
  savedInputs: string[];
  /** An error message to display above the list of aliases. */
  errorMessage?: string;
  /** Callback for when a user adds or removes a word that should be used to update state. */
  onInputChange: (savedInputs: string[]) => void;
}
/** Renders an \<input> used for displaying and editing a list of words. When a user types "," a new word will be added to the list. */
export function CommaSeparatedInput({label, required, savedInputs, errorMessage, onInputChange}: CommaSeparatedInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [validation, setValidation] = useState({valid: true, error: ""});

  /** Handles the response to a user typing in the input. When the user enters a comma, the input will be cleared and a new item will be added to the list below. */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newInputValue = e.target.value;

    // user is submitting their input
    if (newInputValue.endsWith(",")) {
      const trimmedInputVal = newInputValue.slice(0, -1); // remove the ","
      const newValidation = validateInput(trimmedInputVal, validationRules);
      setValidation(newValidation);

      if (newValidation.valid === false) {
        // error exists so remove comma from input
        setInputValue(trimmedInputVal);
      } else {
        // no error so update the saved inputs array and reset the singular input
        setInputValue("");
        onInputChange([...savedInputs, trimmedInputVal.trim()]);
      }
    } else {
      // user is just typing so update the input to match their typing.
      setInputValue(newInputValue);
      setValidation(validateInput(newInputValue, validationRules));
    }
    return;
  }

  /** Handles the response to a user deleting an item from the list, by deleting the item. */
  function handleDelete(val: string) {
    onInputChange(savedInputs.toSpliced(savedInputs.indexOf(val), 1));
  }

  // Creates the display of items under the input.
  const savedInputsDisplay = savedInputs.map((val, index) => (
    <span key={index}>
      {val}
      <button data-cy="remove" onClick={() => handleDelete(val)}>
        x
      </button>
    </span>
  ));

  return (
    <div data-cy="commaSeparatedInputComp" className={styles.container}>
      <Input
        label={label}
        errorMessage={validation.valid ? undefined : validation.error}
        required={required}
        onChange={handleChange}
        value={inputValue}
        onBlur={() => {
          setValidation({valid: true, error: ""});
        }}
        onFocus={() => {
          setValidation(validateInput(inputValue, validationRules));
        }}
      />
      <strong data-cy="errorMessage" className={styles.errorMessage}>
        {errorMessage}
      </strong>
      <div className={styles.savedValues}>{savedInputsDisplay}</div>
    </div>
  );
}
