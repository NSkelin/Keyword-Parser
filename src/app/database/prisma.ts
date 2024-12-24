import prisma from "./client";

/** Gets every collection but flattens the each keywords aliases into an array. */
export async function getCollectionKeywords() {
  const data = await prisma.keywordCollection.findMany({
    select: {
      title: true,
      highlightColor: true,
      keywords: {
        select: {
          id: true,
          displayName: true,
          proficient: true,
          aliases: {
            select: {
              alias: true,
            },
          },
        },
      },
    },
  });

  // Flatten the aliases.
  // {...rest, aliases: [ { alias: string } ] } } -----> {...rest, aliases: string[]}
  const formattedData = data.map(({keywords, highlightColor, ...rest}) => {
    return {
      ...rest,
      highlightColor: highlightColor ?? undefined,
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
      keywordsTitle: collection,
      proficient: proficient,
      aliases: {
        create: aliases,
      },
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

export async function getResumeAssistData() {
  const data = await prisma.resumeSection.findMany({
    include: {
      positions: {
        include: {
          bullets: {
            include: {
              requiredKeywords: {
                include: {
                  aliases: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

interface alias {
  alias: string;
}

interface keyword {
  displayName: string;
  proficient: boolean;
  aliases: alias[];
}

interface collection {
  title: string;
  highlightColor?: string;
  keywords: keyword[];
}

function createAliasesQuery(aliases: alias[]) {
  const query = aliases?.map(({alias}) => {
    return {alias};
  });
  return query;
}

function createKeywordsQuery(keywords: keyword[]) {
  const query = keywords.map(({displayName, proficient, aliases}) => {
    return {
      displayName,
      proficient,
      aliases: {
        create: createAliasesQuery(aliases),
      },
    };
  });

  return query;
}

function createCollectionsQuery(collections: collection[]) {
  const query = collections.map(({title, highlightColor, keywords}) => {
    return {
      title,
      highlightColor,
      keywords: {
        create: createKeywordsQuery(keywords),
      },
    };
  });

  return query;
}

export async function createCollections(collections: collection[]) {
  const collectionsQuery = createCollectionsQuery(collections);

  const newCollections = [];

  for (const query of collectionsQuery) {
    const newCollection = await prisma.keywordCollection.create({
      data: {
        ...query,
      },
    });
    newCollections.push(newCollection);
  }

  return newCollections;
}

export async function deleteCollections() {
  const deleteAliases = prisma.keywordAlias.deleteMany();
  const deleteKeywords = prisma.keyword.deleteMany();
  const deleteCollections = prisma.keywordCollection.deleteMany();

  // The transaction runs synchronously so deleteCollections must run last.
  await prisma.$transaction([deleteAliases, deleteKeywords, deleteCollections]);
}
