import {useEffect, useRef} from "react";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  title: string;
  open?: boolean;
  onCancel?: (e: Event) => void;
  onClose?: (e: Event) => void;
  /** React children */
  children: React.ReactNode;
  /** Dialog onClose event */
}
/** A html dialog wrapper */
export function Dialog({title, open, onCancel, onClose, children}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // open/close dialog depending on open prop.
  useEffect(() => {
    if (!ref.current) return;
    const dialog = ref.current;

    if (open && !ref.current.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // listen for and callback the dialogs cancel event
  useEffect(() => {
    if (!ref.current || !onCancel) return;
    const dialog = ref.current;

    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [onCancel]);

  // listen for and callback the dialogs close event
  useEffect(() => {
    if (!ref.current || !onClose) return;
    const dialog = ref.current;

    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
    };
  }, [onClose]);

  return (
    <dialog data-cy="dialogComp" ref={ref} className={styles.dialog}>
      <h2> {title} </h2>
      {children}
    </dialog>
  );
}

interface ActionBarProps {
  children?: React.ReactNode;
}

function ActionBar({children}: ActionBarProps) {
  return <div className={styles.actionBar}>{children}</div>;
}

Dialog.ActionBar = ActionBar;
