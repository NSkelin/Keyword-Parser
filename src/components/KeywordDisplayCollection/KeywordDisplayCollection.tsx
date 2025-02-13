import {Button} from "@/components/Button";
import {KeywordDisplay} from "@/components/KeywordDisplay";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import {createCollectionAction} from "@/utils/actions";
import type {Keyword} from "@/utils/types";
import Image from "next/image";
import {CSSProperties, useState} from "react";
import {z} from "zod";
import {Dialog} from "../Dialog";
import styles from "./KeywordDisplayCollection.module.scss";

const NewCollection = z.object({
  title: z.string(),
});

export interface Display {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
}
export interface KeywordDisplayCollectionProps extends SubmissionCallbacks {
  /** The list of data used to generate the displays */
  displays: Display[];
  onCollectionCreate: (collectionName: string) => void;
  onCollectionUpdate: (collectionName: string, newCollectionName: string, newHighlightColor: string) => void;
  onCollectionDelete: (collectionName: string) => void;
}

/** Renders a grouped collection of displays. */
export function KeywordDisplayCollection({
  displays,
  onKeywordCreate,
  onKeywordUpdate,
  onKeywordDelete,
  onCollectionCreate,
  onCollectionUpdate,
  onCollectionDelete,
}: KeywordDisplayCollectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  const displaysList = displays.map(({title, keywords, highlightColor}) => {
    return (
      <KeywordDisplay
        key={title}
        keywords={keywords}
        title={title}
        highlightColor={highlightColor}
        onKeywordCreate={onKeywordCreate}
        onKeywordDelete={onKeywordDelete}
        onKeywordUpdate={onKeywordUpdate}
        onCollectionUpdate={onCollectionUpdate}
        onCollectionDelete={onCollectionDelete}
      />
    );
  });

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function handleCollectionCreate(newCollection: string) {
    onCollectionCreate(newCollection);
    closeDialog();
  }

  return (
    <section className={styles.displayCollection}>
      <div className={styles.overflowContainer}>
        {displaysList}
        <Button className={styles.addButton} buttonStyle="create" onClick={openDialog}>
          New collection {addSVG}
        </Button>
      </div>
      <CreateCollectionFormDialog onCreate={handleCollectionCreate} onCancel={closeDialog} open={dialogOpen} />
    </section>
  );
}

interface CreateCollectionFormDialogProps {
  onCreate: (collectionName: string) => void;
  onCancel: () => void;
  open?: boolean;
}

function CreateCollectionFormDialog({onCreate, onCancel, open}: CreateCollectionFormDialogProps) {
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
