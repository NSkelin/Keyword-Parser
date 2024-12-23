import prisma from "../client";

// test all inputs return a correct result
// test that formatted result is correct
// test query works
// test query result formats correctly

/**
 * Gets one or more collections (leave blank for all collections)
 * and all the aliases inside each collection.
 */
export async function getCollectionsAliases(collectionTitles?: string[] | string) {
  if (typeof collectionTitles === "string") {
    collectionTitles = [collectionTitles];
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
  // keywords: [ { aliases: [ { alias: string } ] } } ] -----> aliases: string[]
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
