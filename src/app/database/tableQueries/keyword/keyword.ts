import prisma from "@/database/client";

/** Gets all the aliases for a given keyword */
export async function getKeywordAliases(displayName: string) {
  const data = await prisma.keywordAlias.findMany({
    where: {
      keywordDisplayName: displayName,
    },
    select: {
      alias: true,
    },
  });

  // Flatten aliases
  // [ { alias: string } ] -----> string[]
  const aliases = data.map(({alias}) => alias);

  return aliases;
}

/** Returns a keyword and its aliases */
export async function getKeywordWithAliasesByID(id: number) {
  const keyword = await prisma.keyword.findUnique({
    where: {
      id,
    },
    include: {
      aliases: true,
    },
  });
  return keyword;
}

/** Create a keyword and its aliases */
export async function createKeywordAndAliases(
  displayName: string,
  proficient: boolean,
  aliases: {alias: string}[],
  collection: string,
) {
  const newKeyword = await prisma.keyword.create({
    data: {
      displayName: displayName,
      collectionTitle: collection,
      proficient: proficient,
      aliases: {
        create: aliases,
      },
    },
    include: {
      aliases: true,
    },
  });

  return newKeyword.id;
}

/** Rename a keyword and update its aliases */
export async function updateKeywordAndAliases(
  idToUpdate: number,
  proficient: boolean,
  newAliases: string[],
  newDisplayName: string,
) {
  /**
   * SECTION START ----------
   * Necessary because prisma doesnt support createMany on sqlite which I am using.
   */
  // Get all existing aliases
  const keyword = await prisma.keyword.findFirst({
    select: {
      displayName: true,
    },
    where: {
      id: idToUpdate,
    },
  });
  if (keyword == null) throw new Error("cant find keyword!");
  const oldAliases = await getKeywordAliases(keyword.displayName);

  // get all unique instances between new and old aliases, essentially get the new ones so i can create them.
  const filteredAliases = newAliases.filter((obj) => {
    return !oldAliases.includes(obj);
  });

  // convert aliases to prisma data structure
  const aliasObjs = filteredAliases.map((alias) => {
    return {alias: alias};
  });
  /**
   * SECTION END ----------
   */

  // Update db
  await prisma.keyword.update({
    where: {
      id: idToUpdate,
    },
    data: {
      displayName: newDisplayName,
      proficient: proficient,
      aliases: {
        deleteMany: {
          alias: {
            notIn: newAliases,
          },
        },
        create: aliasObjs,
      },
    },
  });
  return;
}

/** Delete a keyword and its aliases. */
export async function deleteKeywordAndAliases(idToDelete: number) {
  const deleteAliases = prisma.keywordAlias.deleteMany({
    where: {
      keyword: {
        id: idToDelete,
      },
    },
  });
  const deleteKeyword = prisma.keyword.delete({
    where: {
      id: idToDelete,
    },
  });

  await prisma.$transaction([deleteAliases, deleteKeyword]);
  return;
}
