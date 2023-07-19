import {createKeywordsRegEx} from "@/app/utils";
import styles from "./BulletList.module.scss";

interface Bullet {
  ID: number;
  /** The text that will be displayed. */
  bullet: string;
  /** Determines if this bullet will always appear / be inserted into the list regardless of any filters. */
  required?: boolean;
}

export interface BulletListProps {
  /** The list of strings or bullets to render. */
  bullets: Bullet[];
  /** The strings that each bullet will be matched against to decide if it should be enabled or disabled. */
  keywords: string[];
  /** A Map of all the overridden bullets. Used to determine which bullets should be forcibly enabled or disabled */
  overrides: Map<number, boolean>;
  /** Callback for when a bullet gets overridden, used to update state. */
  onOverride: (ID: number, state: boolean) => void;
}
/** Renders a list of strings or bullets. Bullets that do not have a match with the passed in keywords are rendered as crossed out. */
function BulletList({bullets, keywords, overrides, onOverride}: BulletListProps) {
  const enabledBullets: Bullet[] = [];
  const disabledBullets: Bullet[] = [];

  // filters the bullets into those to be displayed, and those to be crossed out.
  for (const {ID, bullet, required} of bullets) {
    const regEx = createKeywordsRegEx(keywords);
    const override = overrides.get(ID);

    // Decide if the bullet should be enabled or disabled.
    if (override === true) {
      // user enabled bullet
      enabledBullets.push({ID, bullet});
    } else if (override === false) {
      // user disabled bullet
      disabledBullets.push({ID, bullet});
    } else if (required === true) {
      // bullet is required by default
      enabledBullets.push({ID, bullet});
    } else if (regEx.test(bullet)) {
      // bullet contains any of the keywords
      enabledBullets.push({ID, bullet});
    } else {
      disabledBullets.push({ID, bullet});
    }
  }

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
      <button onClick={copyBulletsToClipboard}>Copy to Clipboard</button>
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

export default BulletList;
