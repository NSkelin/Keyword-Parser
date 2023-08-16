import React, {InputHTMLAttributes} from "react";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input. */
  label?: string;
  /** Displays the message as red text above the label to indicate an error with the input. */
  errorMessage?: string;
  /** Adds a red "*" character directly infront of the label to indicate this input field is required.  */
  required?: boolean;
}
/** A wrapper for the html input component that adds support for labels and error messages. */
function Input({label, errorMessage, required = false, ...props}: InputProps) {
  return (
    <div data-cy="inputComp" className={styles.wrapper}>
      <strong data-cy="errorMessage" className={styles.errorMessage}>
        {errorMessage}
      </strong>
      <label>
        <div>
          <span style={{color: "red"}}>{required ? "*" : ""}</span>
          {label}
        </div>
        <input data-cy="input" {...props}></input>
      </label>
    </div>
  );
}

export default Input;
