-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "collectionTitle" TEXT NOT NULL,
    "bulletId" INTEGER,
    CONSTRAINT "keyword_collectionTitle_fkey" FOREIGN KEY ("collectionTitle") REFERENCES "keywordCollection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "keyword_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "bullet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("bulletId", "displayName", "id", "proficient", "collectionTitle") SELECT "bulletId", "displayName", "id", "proficient", "keywordsTitle" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
CREATE UNIQUE INDEX "keyword_displayName_key" ON "keyword"("displayName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
