import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import {deleteCollectionAction} from "@/utils/actions";
import Image from "next/image";
import {useState} from "react";
import {useForm} from "react-hook-form";
import styles from "./DeleteCollectionFormDialog.module.scss";

export interface DeleteCollectionFormDialogProps {
  collectionName: string;
  onDelete: () => void;
  onCancel: () => void;
  open?: boolean;
}

export function DeleteCollectionFormDialog({collectionName, onDelete, onCancel, open}: DeleteCollectionFormDialogProps) {
  const [serverMsg, setServerMsg] = useState("");
  const {handleSubmit} = useForm();

  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;

  async function onSubmit() {
    const {success, message} = await deleteCollectionAction(collectionName);
    setServerMsg(message);

    if (success) {
      onDelete();
    }
  }

  return (
    <Dialog title="Delete Collection" onCancel={onCancel} open={open}>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className={styles.form}
      >
        <div className={styles.content}>
          <span>
            Are you sure you want to delete <b>{collectionName}</b>?
          </span>

          <strong>This action cannot be undone.</strong>
        </div>
        <div className={styles.serverError}>{serverMsg}</div>
        <Dialog.ActionBar>
          <Button buttonStyle="delete" type="submit">
            Yes, delete forever {trashSVG}
          </Button>
          <Button data-cy="cancelButton" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Dialog.ActionBar>
      </form>
    </Dialog>
  );
}
