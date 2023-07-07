import React, {ChangeEvent, useState} from "react";
import styles from "./CommaSeparatedInput.module.scss";

export type CommaSeparatedInputProps = {
  /** Label for the input */
  label?: string;
  /** The list of words shown below the input */
  savedInputs: string[];
  /** Callback for when a user adds or removes a word that should be used to update state */
  onInputChange: (savedInputs: string[]) => void;
};
/** Renders an \<input> used for displaying and editing a list of words. When a user types "," a new word will be added to the list. */
function CommaSeparatedInput({label, savedInputs, onInputChange}: CommaSeparatedInputProps) {
  const [inputValue, setInputValue] = useState("");

  /** Handles the response to a user typing in the input. When the user enters a comma, the input will be cleared and a new item will be added to the list below. */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value;
    if (newVal.slice(-1) === ",") {
      setInputValue("");
      onInputChange([...savedInputs, newVal.slice(0, -1).trim()]);
    } else {
      setInputValue(newVal);
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
      <button onClick={() => handleDelete(val)}>x</button>
    </span>
  ));

  return (
    <div className={styles.container}>
      <label>
        {label}
        <input onChange={handleChange} value={inputValue}></input>
      </label>

      <div className={styles.savedValues}>{savedInputsDisplay}</div>
    </div>
  );
}

export default CommaSeparatedInput;
