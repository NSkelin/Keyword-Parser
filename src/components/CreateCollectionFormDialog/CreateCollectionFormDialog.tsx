import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import {createCollectionAction} from "@/utils/actions";
import Image from "next/image";
import {useState} from "react";
import {z} from "zod";
import styles from "./CreateCollectionFormDialog.module.scss";

const NewCollection = z.object({
  title: z.string(),
});

export interface CreateCollectionFormDialogProps {
  onCreate: (collectionName: string) => void;
  onCancel: () => void;
  open?: boolean;
}

export function CreateCollectionFormDialog({onCreate, onCancel, open}: CreateCollectionFormDialogProps) {
  const [collectionName, setCollectionName] = useState("");

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  async function createCollection(formData: FormData) {
    const {title} = NewCollection.parse({
      title: formData.get("title"),
    });

    await createCollectionAction(formData);
    setCollectionName("");
    onCreate(title);
  }

  function handleCancel() {
    // reset inputs
    setCollectionName("");

    onCancel();
  }

  return (
    <Dialog onCancel={handleCancel} open={open}>
      <form action={createCollection} className={styles.form}>
        <h2>Create a new collection</h2>
        <div className={styles.inputs}>
          <input
            placeholder="collection name"
            name="title"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          ></input>
        </div>
        <div className={styles.actionBar}>
          <Button buttonStyle="submit" type="submit">
            Create {addSVG}
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
