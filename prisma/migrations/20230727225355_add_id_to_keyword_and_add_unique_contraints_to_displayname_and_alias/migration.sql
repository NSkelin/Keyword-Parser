/*
  Warnings:

  - The primary key for the `keyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[alias]` on the table `keywordAlias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `keyword` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "keywordsTitle" TEXT NOT NULL,
    "bulletId" INTEGER,
    CONSTRAINT "keyword_keywordsTitle_fkey" FOREIGN KEY ("keywordsTitle") REFERENCES "keywordCollection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "keyword_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "bullet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("bulletId", "displayName", "keywordsTitle", "proficient") SELECT "bulletId", "displayName", "keywordsTitle", "proficient" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
CREATE UNIQUE INDEX "keyword_displayName_key" ON "keyword"("displayName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "keywordAlias_alias_key" ON "keywordAlias"("alias");
