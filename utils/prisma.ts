import {PrismaClient} from "@prisma/client";

// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

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

  const formattedData = data.map(({keywords, ...rest}) => {
    return {
      ...rest,
      keywords: keywords.flatMap((keyword) => {
        return keyword.aliases.map((obj) => obj.alias);
      }),
    };
  });

  return formattedData;
}
