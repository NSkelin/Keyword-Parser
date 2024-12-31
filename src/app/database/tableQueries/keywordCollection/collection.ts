import prisma from "@/database/client";

/**
 * Gets one or more collections (leave blank for all collections)
 * and all the aliases inside each collection.
 */
export async function getCollectionsAliases(collectionTitles?: string[] | string) {
  if (typeof collectionTitles === "string") {
    collectionTitles = [collectionTitles];
  } else if (collectionTitles !== undefined && collectionTitles.length === 0) {
    collectionTitles = undefined;
  }

  // Find one or more collections by title or undefined for all collections and include all of the aliases in each collection.
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
    where: collectionTitles ? {title: {in: collectionTitles}} : undefined,
  });

  // Format the returned collections keywords like so:
  // aliases: [ { aliases: [ { alias: string } ] } } ] -----> aliases: string[]
  const formattedData = data.map(({keywords, highlightColor, ...rest}) => {
    return {
      ...rest,
      highlightColor: highlightColor ?? undefined,
      aliases: keywords.flatMap((keyword) => {
        return keyword.aliases.map((obj) => obj.alias);
      }),
    };
  });

  return formattedData;
}

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
      include: {
        keywords: {
          include: {
            aliases: true,
          },
        },
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