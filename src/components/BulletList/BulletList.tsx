import Image from "next/image";
import styles from "./BulletList.module.scss";

interface Bullet {
  ID: number;
  /** The text that will be displayed. */
  bullet: string;
}

export interface BulletListProps {
  enabledBullets: Bullet[];
  disabledBullets: Bullet[];
  /** Callback for when a bullet gets overridden, used to update state. */
  onOverride: (ID: number, state: boolean) => void;
}
/** Renders a list of strings or bullets. Bullets that do not have a match with the passed in keywords are rendered as crossed out. */
export function BulletList({enabledBullets, disabledBullets, onOverride}: BulletListProps) {
  // copies displayed bullets to the clipboard when clicked.
  function copyBulletsToClipboard() {
    const bulletsToCopy = enabledBullets.map(({bullet}) => bullet).join("\n");
    navigator.clipboard.writeText(bulletsToCopy).then(
      () => {
        // TODO ~
        // Success ~
        // Popup notifying successful copy
        return;
      },
      () => {
        // TODO ~
        // Failed ~
        // Popup notifying failed copy
        return;
      },
    );
  }

  return (
    <>
      <button className={styles.button} onClick={copyBulletsToClipboard}>
        <Image src="/content_copy.svg" alt="Copy to clipboard icon" width={20} height={20} />
      </button>
      <ul>
        {enabledBullets.map(({ID, bullet}) => (
          <li key={ID}>
            <input type="checkbox" checked={true} onChange={() => onOverride(ID, false)}></input>
            {bullet}
          </li>
        ))}
        {disabledBullets.map(({ID, bullet}) => (
          <li key={ID} className={styles.disabledBullet}>
            <input type="checkbox" checked={false} onChange={() => onOverride(ID, true)}></input>
            {bullet}
          </li>
        ))}
      </ul>
    </>
  );
}
