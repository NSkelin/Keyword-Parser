import React from "react";
import styles from "./ToggleButton.module.scss";

export interface ToggleButtonProps {
  /**
   * Controls whether the button is toggled on or off. Defaults to on (true).
   */
  enabled?: boolean;
  children: React.ReactNode;
  /**
   * Callback for when the user clicks the button.
   */
  onClick?: () => void;
}

/** A button that can be toggled on and off. */
function ToggleButton({enabled, children, onClick}: ToggleButtonProps) {
  enabled = enabled ?? true;
  return (
    <button className={`${styles.toggleButton} ${enabled ? styles.enabled : styles.disabled}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default ToggleButton;
