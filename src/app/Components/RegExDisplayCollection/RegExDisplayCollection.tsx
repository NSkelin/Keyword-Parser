import {RegExDisplay} from "@/components";
import React from "react";
import prisma from "src/app/database/client";
import styles from "./RegExDisplayCollection.module.scss";

/** Renders a RegExDisplay for every collection in the database. Used for debugging. */
async function RegExDisplayCollection() {
  const collections = await prisma.keywordCollection.findMany({
    select: {title: true},
  });

  const displays = collections.map((collection) => {
    return <RegExDisplay key={collection.title} collection={collection.title} />;
  });

  return <aside className={styles.regExList}>{displays}</aside>;
}

export default RegExDisplayCollection;
