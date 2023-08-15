import {Input} from "@/components";
import React, {ChangeEvent, useState} from "react";
import styles from "./CommaSeparatedInput.module.scss";

export interface CommaSeparatedInputProps {
  /** Label for the input. */
  label?: string;
  /** Adds a red "*" character directly infront of the label to indicate this input field is required.  */
  required?: boolean;
  /** The list of words shown below the input. */
  savedInputs: string[];
  /** Callback for when a user adds or removes a word that should be used to update state. */
  onInputChange: (savedInputs: string[]) => void;
  /** Function to validate the alias before it gets saved. Return null for no errors and a string for an error.
   * The string will be displayed to the user so keep it descriptive of the error and how to fix it. */
  inputValidation: (input: string) => string | null;
}
/** Renders an \<input> used for displaying and editing a list of words. When a user types "," a new word will be added to the list. */
function CommaSeparatedInput({label, required, savedInputs, onInputChange, inputValidation}: CommaSeparatedInputProps) {
  const [inputValue, setInputValue] = useState("");
  const errorMessage = inputValidation(inputValue) ?? undefined; // convert null to undefined for <Input />

  /** Handles the response to a user typing in the input. When the user enters a comma, the input will be cleared and a new item will be added to the list below. */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputVal = e.target.value;

    // user is submitting their input
    if (inputVal.endsWith(",")) {
      const trimmedInputVal = inputVal.slice(0, -1); // remove the ","

      if (errorMessage !== undefined) {
        // error exists so remove comma from input
        setInputValue(trimmedInputVal);
      } else {
        // no error so update the saved inputs array and reset the singular input
        setInputValue("");
        onInputChange([...savedInputs, trimmedInputVal.trim()]);
      }
    } else {
      // user is just typing so update the input to match their typing.
      setInputValue(inputVal);
    }
    return;
  }

  /** Handles the response to a user deleting an item from the list, by deleting the item. */
  function handleDelete(val: string) {
    // @ts-expect-error toSpliced exists but is not currently supported in typescript.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
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
    <div data-cy="commaSeparatedInput" className={styles.container}>
      <Input label={label} errorMessage={errorMessage} required={required} onChange={handleChange} value={inputValue} />
      <div className={styles.savedValues}>{savedInputsDisplay}</div>
    </div>
  );
}

export default CommaSeparatedInput;
