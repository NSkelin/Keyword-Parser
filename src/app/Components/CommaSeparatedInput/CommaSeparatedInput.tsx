import React, {ChangeEvent, useState} from "react";
import styles from "./CommaSeparatedInput.module.scss";

export type CommaSeparatedInputProps = {label: string; savedInputs: string[]; onInputChange: (savedInputs: string[]) => void};
function CommaSeparatedInput({label, savedInputs, onInputChange}: CommaSeparatedInputProps) {
  const [inputValue, setInputValue] = useState("");

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

  function handleDelete(val: string) {
    onInputChange(savedInputs.toSpliced(savedInputs.indexOf(val), 1));
  }

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
