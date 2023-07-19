import {createKeywordsRegEx} from "@/app/utils";
import styles from "./BulletList.module.scss";

export interface BulletListProps {
  /** The list of strings or bullets to render. */
  bullets: {ID: number; bullet: string}[];
  /** The strings that each bullet will be matched against to decide if it should be enabled or disabled. */
  keywords: string[];
  /** A Map of all the overridden bullets. Used to determine which bullets should be forcibly enabled or disabled */
  overrides: Map<number, boolean>;
  /** Callback for when a bullet gets overridden, used to update state. */
  onOverride: (ID: number, state: boolean) => void;
}
/** Renders a list of strings or bullets. Bullets that do not have a match with the passed in keywords are rendered as crossed out. */
function BulletList({bullets, keywords, overrides, onOverride}: BulletListProps) {
  const enabledBullets: {ID: number; bullet: string}[] = [];
  const disabledBullets: {ID: number; bullet: string}[] = [];

  // filters the bullets into those to be displayed, and those to be crossed out.
  for (const {ID, bullet} of bullets) {
    const regEx = createKeywordsRegEx(keywords);
    const override = overrides.get(ID);

    // set the bullet to the overridden state, otherwise set it based on if the bullet has any of the keywords.
    if (override != null) {
      if (override) enabledBullets.push({ID, bullet});
      else disabledBullets.push({ID, bullet});
    } else if (regEx.test(bullet)) {
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
