/*
  Warnings:

  - You are about to drop the column `subtTitle` on the `position` table. All the data in the column will be lost.
  - Added the required column `subTitle` to the `position` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "resumeSectionTitle" TEXT NOT NULL,
    CONSTRAINT "position_resumeSectionTitle_fkey" FOREIGN KEY ("resumeSectionTitle") REFERENCES "resumeSection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_position" ("endDate", "id", "resumeSectionTitle", "startDate", "title", "subTitle") SELECT "endDate", "id", "resumeSectionTitle", "startDate", "title", "subtTitle" FROM "position";
DROP TABLE "position";
ALTER TABLE "new_position" RENAME TO "position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
