import React, {forwardRef} from "react";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  /** React children */
  children: React.ReactNode;
  /** Dialog onClose event */
  onClose?: () => void;
}
/** A html dialog wrapper */
const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog({children, onClose}: DialogProps, ref) {
  return (
    <dialog data-cy="dialog" ref={ref} className={styles.dialog} onClose={onClose}>
      {children}
    </dialog>
  );
});

export default Dialog;
