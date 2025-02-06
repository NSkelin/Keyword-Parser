import {useEffect, useRef} from "react";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  open?: boolean;
  /** React children */
  children: React.ReactNode;
  /** Dialog onClose event */
}
/** A html dialog wrapper */
export function Dialog({open, children}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (open) {
      if (!ref.current.open) {
        ref.current.showModal();
      }
    } else {
      ref.current.close();
    }
  }, [open]);

  return (
    <dialog data-cy="dialogComp" ref={ref} className={styles.dialog}>
      {children}
    </dialog>
  );
}
