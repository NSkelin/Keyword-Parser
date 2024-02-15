import React, {useState} from "react";
import styles from "./ToggleButton.module.scss";

export interface ToggleButtonProps {
  /**
   * The initial state of the button. Defaults to true.
   */
  initialState?: boolean;
  children: React.ReactNode;
}

/** A button that can be toggled on and off. */
function ToggleButton({initialState, children}: ToggleButtonProps) {
  const [enabled, setEnabled] = useState(initialState ?? true);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  return (
    <button className={`${styles.toggleButton} ${enabled ? styles.enabled : styles.disabled}`} onClick={handleClick}>
      {children}
    </button>
  );
}

export default ToggleButton;
