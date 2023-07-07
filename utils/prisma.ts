import {PrismaClient} from "@prisma/client";

// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// gets each alias for every collection
export async function getCollectionAliases(collectionTitles?: string[] | string) {
  const data = await prisma.keywordCollection.findMany({
    include: {
      keywords: {
        select: {
          aliases: {
            select: {
              alias: true,
            },
          },
        },
      },
    },
    where:
      collectionTitles == null
        ? undefined
        : typeof collectionTitles === "string"
        ? {title: collectionTitles}
        : {title: {in: collectionTitles}},
  });

  const formattedData = data.map(({keywords, color, ...rest}) => {
    return {
      ...rest,
      color: color == null ? undefined : color,
      keywords: keywords.flatMap((keyword) => {
        return keyword.aliases.map((obj) => obj.alias);
      }),
    };
  });

  return formattedData;
}

// gets each keyword and its aliases for every collection
export async function getCollectionKeywords() {
  const data = await prisma.keywordCollection.findMany({
    select: {
      title: true,
      color: true,
      keywords: {
        select: {
          displayName: true,
          aliases: {
            select: {
              alias: true,
            },
          },
        },
      },
    },
  });

  const formattedData = data.map(({keywords, color, ...rest}) => {
    return {
      ...rest,
      highlightColor: color == null ? undefined : color,
      keywords: keywords.map(({aliases, ...rest}) => {
        return {
          ...rest,
          aliases: aliases.map(({alias}) => {
            return alias;
          }),
        };
      }),
    };
  });

  return formattedData;
}

/**
 * Gets all the aliases for a given keyword
 */
export async function getKeywordAliases(displayName: string) {
  const data = await prisma.keywordAlias.findMany({
    where: {
      keywordDisplayName: displayName,
    },
    select: {
      alias: true,
    },
  });

  const aliases = data.map(({alias}) => alias);

  return aliases;
}

/**
 * Create a keyword and its aliases
 */
export async function createKeywordAndAliases(displayName: string, aliases: {alias: string}[], collection: string) {
  await prisma.keyword.create({
    data: {
      displayName: displayName,
      keywordsTitle: collection,
      aliases: {
        create: aliases,
      },
    },
  });
}

/**
 * Rename a keyword and update its aliases
 */
export async function updateKeywordAndAliases(displayName: string, newAliases: string[], newDisplayName?: string) {
  /**
   * SECTION START ----------
   * Necessary because prisma doesnt support createMany on sqlite which I am using.
   */
  // Get all existing aliases
  const oldAliases = await getKeywordAliases(displayName);

  // get all unique instances between new and old aliases, essentially get the new ones so i can create them.
  const filteredAliases = newAliases.filter((obj) => {
    return oldAliases.indexOf(obj) == -1;
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
      displayName: displayName,
    },
    data: {
      displayName: newDisplayName == null ? displayName : newDisplayName,
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

/**
 * Delete a keyword and its aliases.
 */
export async function deleteKeywordAndAliases(displayName: string) {
  const deleteAliases = prisma.keywordAlias.deleteMany({
    where: {
      keywordDisplayName: displayName,
    },
  });
  const deleteKeyword = prisma.keyword.delete({
    where: {
      displayName: displayName,
    },
  });

  await prisma.$transaction([deleteAliases, deleteKeyword]);
  return;
}
