import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import {deleteCollectionAction} from "@/utils/actions";
import Image from "next/image";
import styles from "./DeleteCollectionFormDialog.module.scss";

export interface DeleteCollectionFormDialogProps {
  collectionName: string;
  onDelete: () => void;
  onCancel: () => void;
  open?: boolean;
}

export function DeleteCollectionFormDialog({collectionName, onDelete, onCancel, open}: DeleteCollectionFormDialogProps) {
  const trashSVG = <Image src="/delete_forever.svg" alt="Edit icon" width={20} height={20} />;

  async function handleCollectionDelete() {
    await deleteCollectionAction(collectionName);
    onDelete();
  }

  return (
    <Dialog onCancel={onCancel} open={open}>
      <form action={handleCollectionDelete} className={styles.form}>
        <div className={styles.warning}>
          <h3>Are you sure you want to delete this collection</h3>
          <b>{collectionName}</b>
          <span>This action cannot be undone.</span>
        </div>
        <div className={styles.actionBar}>
          <Button buttonStyle="delete" type="submit">
            Yes, delete forever {trashSVG}
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
