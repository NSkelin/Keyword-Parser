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
      color: color == null ? undefined : color,
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
