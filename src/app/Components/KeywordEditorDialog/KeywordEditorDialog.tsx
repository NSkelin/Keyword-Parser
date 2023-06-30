import React, {forwardRef} from "react";
import styles from "./KeywordEditorDialog.module.scss";

export type KeywordEditorDialogProps = {
  collection: string;
  displayName?: string;
  aliases?: string;
};
const KeywordEditorDialog = forwardRef<HTMLDialogElement, KeywordEditorDialogProps>(function KeywordEditorDialog(
  {collection, displayName = "", aliases = ""},
  dialogRef
) {
  return (
    <>
      <dialog className={styles.dialog} ref={dialogRef}>
        <form action={`api/${collection}`} method="POST">
          <label>
            Display name
            <input name="displayName" id="displayName" defaultValue={displayName}></input>
          </label>
          <label>
            Aliases (comma separated)
            <input name="aliases" id="aliases" defaultValue={aliases}></input>
          </label>
          <div className={styles.buttonWrap}>
            <button formMethod="dialog">Cancel</button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default KeywordEditorDialog;
