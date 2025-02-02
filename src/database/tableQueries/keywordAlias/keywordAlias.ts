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
