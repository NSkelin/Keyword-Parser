/*
  Warnings:

  - You are about to drop the `bulletRestriction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `required` on the `bullet` table. All the data in the column will be lost.
  - Added the required column `default` to the `bullet` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bulletRestriction";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "displayName" TEXT NOT NULL PRIMARY KEY,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "keywordsTitle" TEXT NOT NULL,
    "bulletId" INTEGER,
    CONSTRAINT "keyword_keywordsTitle_fkey" FOREIGN KEY ("keywordsTitle") REFERENCES "keywordCollection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "keyword_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "bullet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("displayName", "keywordsTitle", "proficient") SELECT "displayName", "keywordsTitle", "proficient" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
CREATE TABLE "new_bullet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "fill" BOOLEAN NOT NULL,
    "positionId" INTEGER,
    CONSTRAINT "bullet_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bullet" ("fill", "id", "point", "positionId", "default") SELECT "fill", "id", "point", "positionId", "restrictions" FROM "bullet";
DROP TABLE "bullet";
ALTER TABLE "new_bullet" RENAME TO "bullet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
