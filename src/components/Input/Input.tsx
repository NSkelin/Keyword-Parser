import {InputHTMLAttributes} from "react";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input. */
  label?: string;
  /** Displays the message as red text above the label to indicate an error with the input. */
  errorMessage?: string;
  /** Adds a red "*" character directly infront of the label to indicate this input field is required.  */
  required?: boolean;
  /** Overrides the main data-cy for testing purposes. */
  "data-cy"?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}
/** A wrapper for the html input component that adds support for labels and error messages. */
export function Input({label, errorMessage, "data-cy": dataCy, required = false, type, ...props}: InputProps) {
  return (
    <div data-cy={dataCy ?? "inputComp"} className={styles.wrapper}>
      <strong data-cy="errorMessage" className={styles.errorMessage}>
        {errorMessage}
      </strong>
      <label className={type === "checkbox" ? styles.checkbox : ""}>
        <div>
          <span style={{color: "red"}}>{required ? "*" : ""}</span>
          {label}
        </div>
        <input data-cy="input" type={type} {...props}></input>
      </label>
    </div>
  );
}
