// lib/prisma.ts
import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// retrieve data from db
export async function getCollectionAliases(collectionTitle: string) {
  return await prisma.keywordAlias.findMany({
    where: {
      keyword: {
        keywords: {
          title: collectionTitle,
        },
      },
    },
  });
}
