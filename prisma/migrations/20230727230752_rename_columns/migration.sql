/*
  Warnings:

  - You are about to drop the column `color` on the `keywordCollection` table. All the data in the column will be lost.
  - You are about to drop the column `default` on the `bullet` table. All the data in the column will be lost.
  - Added the required column `includeByDefault` to the `bullet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keywordCollection" (
    "title" TEXT NOT NULL PRIMARY KEY,
    "highlightColor" TEXT
);
INSERT INTO "new_keywordCollection" ("title", "highlightColor") SELECT "title", "color" FROM "keywordCollection";
DROP TABLE "keywordCollection";
ALTER TABLE "new_keywordCollection" RENAME TO "keywordCollection";
CREATE TABLE "new_bullet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" TEXT NOT NULL,
    "includeByDefault" BOOLEAN NOT NULL,
    "fill" BOOLEAN NOT NULL,
    "positionId" INTEGER,
    CONSTRAINT "bullet_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_bullet" ("fill", "id", "point", "positionId", "includeByDefault") SELECT "fill", "id", "point", "positionId", "default" FROM "bullet";
DROP TABLE "bullet";
ALTER TABLE "new_bullet" RENAME TO "bullet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
