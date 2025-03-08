import prisma from "@/database/client";
import {getKeywordAliases} from "@/database/tableQueries/keywordAlias";
import {prismaQueryErrorHandlingWrapper} from "@/utils";

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

/**
 * Creates a keyword and creates its aliases.
 *
 * @param displayName The name of keyword.
 * @param aliases Any aliases used to reference this keyword.
 * @param collection The collection this keyword is apart of.
 */
export async function createKeywordWithAliases(
  displayName: string,
  proficient: boolean,
  aliases: {alias: string}[],
  collection: string,
) {
  return prismaQueryErrorHandlingWrapper(() =>
    prisma.keyword.create({
      data: {
        displayName: displayName,
        collectionTitle: collection,
        proficient: proficient,
        aliases: {
          create: aliases,
        },
      },
    }),
  );
}

/**
 * Update a keyword and replace its aliases.
 *
 * Any aliases that are in the DB and are the same as any new aliases will not be removed or replaced, meaning fields such as ID will remain the same.
 * All other aliases in the DB will removed and all non duplicate new aliases will be created.
 */
export async function updateKeywordAndAliases(
  keywordID: number,
  newProficient: boolean,
  newAliases: string[],
  newDisplayName: string,
) {
  const keyword = await prisma.keyword.findFirst({
    select: {
      displayName: true,
    },
    where: {
      id: keywordID,
    },
  });
  if (keyword == null) throw new Error("cant find keyword!");

  const currentAliases = await getKeywordAliases(keyword.displayName);

  // Get only the aliases that are truly new and not currently existing in the DB.
  // This is because the duplicates are not deleted from the DB so we only want to add in non-duplicate aliases.
  // I am unsure why i do it like this, my guess is to preserve the aliases ID as something down the line might require it to stay the same?
  const uniqueNewAliases = newAliases.filter((obj) => {
    return !currentAliases.includes(obj);
  });

  await prisma.keyword.update({
    where: {
      id: keywordID,
    },
    data: {
      displayName: newDisplayName,
      proficient: newProficient,
      aliases: {
        deleteMany: {
          alias: {
            notIn: newAliases,
          },
        },
        createMany: {
          data: uniqueNewAliases.map((alias) => ({alias})),
        },
      },
    },
  });
  return;
}

/**
 * Delete a keyword and all of its aliases.
 *
 * @param keywordID The ID of the keyword you want to delete.
 */
export async function deleteKeywordAndAliases(keywordID: number) {
  const deleteAliases = prisma.keywordAlias.deleteMany({
    where: {
      keyword: {
        id: keywordID,
      },
    },
  });
  const deleteKeyword = prisma.keyword.delete({
    where: {
      id: keywordID,
    },
  });

  await prisma.$transaction([deleteAliases, deleteKeyword]);
  return;
}
