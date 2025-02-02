import {KeywordDisplay} from "@/components/KeywordDisplay";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import {createCollectionAction} from "@/utils/actions";
import type {Keyword} from "@/utils/types";
import {CSSProperties, useRef, useState} from "react";
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
  const [collectionName, setCollectionName] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
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
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
    // reset inputs
    setCollectionName("");
  }

  async function handleCreateCollection(formData: FormData) {
    const {title} = NewCollection.parse({
      title: formData.get("title"),
    });

    await createCollectionAction(formData);
    onCollectionCreate(title);
    closeDialog();
  }

  function handleDialogCancel() {
    closeDialog();
  }

  return (
    <section className={styles.displayCollection}>
      <button onClick={openDialog}>Create new collection</button>
      <div className={styles.overflowContainer}>{displaysList}</div>
      <Dialog ref={dialogRef}>
        <form action={handleCreateCollection} className={styles.form}>
          <h2>Create a new collection</h2>
          <div className={styles.inputs}>
            <input
              placeholder="collection title"
              name="title"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            ></input>
          </div>
          <div className={styles.actionBar}>
            <button type="submit">Create</button>
            <button type="button" onClick={handleDialogCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}
