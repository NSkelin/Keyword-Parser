/*
  Warnings:

  - Made the column `keywordsTitle` on table `keyword` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keywordDisplayName` on table `keywordAlias` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "displayName" TEXT NOT NULL PRIMARY KEY,
    "keywordsTitle" TEXT NOT NULL,
    CONSTRAINT "keyword_keywordsTitle_fkey" FOREIGN KEY ("keywordsTitle") REFERENCES "keywordCollection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("displayName", "keywordsTitle") SELECT "displayName", "keywordsTitle" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
CREATE TABLE "new_keywordAlias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "keywordDisplayName" TEXT NOT NULL,
    CONSTRAINT "keywordAlias_keywordDisplayName_fkey" FOREIGN KEY ("keywordDisplayName") REFERENCES "keyword" ("displayName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_keywordAlias" ("alias", "id", "keywordDisplayName") SELECT "alias", "id", "keywordDisplayName" FROM "keywordAlias";
DROP TABLE "keywordAlias";
ALTER TABLE "new_keywordAlias" RENAME TO "keywordAlias";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
