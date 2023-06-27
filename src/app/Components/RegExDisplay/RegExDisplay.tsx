import React, {createElement} from "react";
import styles from "./RegExDisplay.module.scss";
import {createKeywordsRegEx} from "utils";
import prisma from "utils/prisma";

type RegExDisplayProps = {
  /**
   * Title for the Keyword collection
   */
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};
async function RegExDisplay({title, headingLevel = 3}: RegExDisplayProps) {
  const Heading = createElement("h" + headingLevel, null, title);

  // retrieve data from db
  const aliases = await prisma.keywordAlias.findMany({
    where: {
      keyword: {
        keywords: {
          title: title,
        },
      },
    },

    select: {alias: true},
  });

  // parse data
  let arr: string[] = [];
  for (const alias of aliases) {
    arr.push(alias.alias);
  }

  return (
    <>
      {Heading}
      <p className={styles.background}>{createKeywordsRegEx(arr).toString()}</p>
    </>
  );
}

export default RegExDisplay;
