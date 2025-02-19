import prisma from "@/database/client";
import {Prisma} from "@prisma/client";

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
  // keywords: [ { aliases: [ { alias: alias1 }, { ... } ] }, { ... } ] -----> aliases: [ alias1, ... ]
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
export async function getCollectionsKeywords() {
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

  // Flatten the aliases for each keyword like so:
  // aliases: [ { alias: alias1 }, {...} ] -----> aliases: [ alias1, ... ]
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

/**
 * Creates one ore more new collections with its keywords and the keywords aliases all at once.
 */
export async function createCollectionsWithKeywordsAndAliases(collections: collection[]) {
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

export async function getCollectionsWithKeywordsAndAliases(collectionTitles: string[]) {
  return await prisma.keywordCollection.findMany({
    where: {
      title: {in: collectionTitles},
    },
    include: {
      keywords: {
        include: {
          aliases: true,
        },
      },
    },
  });
}

/**
 * DO NOT USE --- THIS FUNCTION IS FOR TESTING ONLY.
 *
 * Deletes every collection and all related tables.
 */
export async function deleteAllCollections() {
  const deleteAliases = prisma.keywordAlias.deleteMany();
  const deleteKeywords = prisma.keyword.deleteMany();
  const deleteCollections = prisma.keywordCollection.deleteMany();

  // The transaction runs synchronously so deleteCollections must run last.
  await prisma.$transaction([deleteAliases, deleteKeywords, deleteCollections]);
}

/**
 * Creates one or more new empty keywordCollections. Does not create keywords or aliases.
 */
export async function createCollections(collections: {title: string; highlightColor: string}[]): Promise<{
  success: boolean;
  data?: Prisma.BatchPayload;
  error?: Pick<Prisma.PrismaClientKnownRequestError, "code" | "message" | "meta">;
}> {
  try {
    const data = await prisma.keywordCollection.createMany({
      data: collections,
    });

    return {
      success: true,
      data,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const {code, message, meta} = e;
      return {
        success: false,
        error: {
          code,
          message,
          meta,
        },
      };
    }
    throw e;
  }
}

/**
 * Updates the fields for a keyword collection.
 */
export async function updateCollection(collectionTitle: string, newData: {newTitle?: string; newHighlightColor?: string}) {
  await prisma.keywordCollection.update({
    where: {
      title: collectionTitle,
    },
    data: {
      title: newData.newTitle ?? undefined,
      highlightColor: newData.newHighlightColor ?? undefined,
      keywords: undefined,
    },
  });
}

export async function deleteCollection(title: string) {
  const deleteCollection = prisma.keywordCollection.deleteMany({
    where: {title: title},
  });

  await prisma.$transaction([deleteCollection]);
}
