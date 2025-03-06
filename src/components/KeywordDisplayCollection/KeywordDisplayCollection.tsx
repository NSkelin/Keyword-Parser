import {Button} from "@/components/Button";
import {CreateCollectionFormDialog} from "@/components/CreateCollectionFormDialog";
import {KeywordDisplay} from "@/components/KeywordDisplay";
import type {SubmissionCallbacks} from "@/components/KeywordEditor";
import type {Keyword} from "@/utils/types";
import Image from "next/image";
import {CSSProperties, useState} from "react";
import type {CreateKeywordFormDialogProps} from "../CreateKeywordFormDialog";
import styles from "./KeywordDisplayCollection.module.scss";

export interface Display {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
}
export interface KeywordDisplayCollectionProps extends SubmissionCallbacks {
  /** The list of data used to generate the displays */
  displays: Display[];
  onKeywordCreate: CreateKeywordFormDialogProps["onCreate"];
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
        <Button data-cy="openButton" className={styles.addButton} buttonStyle="create" onClick={openDialog}>
          New collection {addSVG}
        </Button>
      </div>
      <CreateCollectionFormDialog onCreate={handleCollectionCreate} onCancel={closeDialog} open={dialogOpen} />
    </section>
  );
}
