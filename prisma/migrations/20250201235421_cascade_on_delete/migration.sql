-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "collectionTitle" TEXT NOT NULL,
    "bulletId" INTEGER,
    CONSTRAINT "keyword_collectionTitle_fkey" FOREIGN KEY ("collectionTitle") REFERENCES "keywordCollection" ("title") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "keyword_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "bullet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("bulletId", "collectionTitle", "displayName", "id", "proficient") SELECT "bulletId", "collectionTitle", "displayName", "id", "proficient" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
CREATE UNIQUE INDEX "keyword_displayName_key" ON "keyword"("displayName");
CREATE TABLE "new_keywordAlias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "keywordDisplayName" TEXT NOT NULL,
    CONSTRAINT "keywordAlias_keywordDisplayName_fkey" FOREIGN KEY ("keywordDisplayName") REFERENCES "keyword" ("displayName") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_keywordAlias" ("alias", "id", "keywordDisplayName") SELECT "alias", "id", "keywordDisplayName" FROM "keywordAlias";
DROP TABLE "keywordAlias";
ALTER TABLE "new_keywordAlias" RENAME TO "keywordAlias";
CREATE UNIQUE INDEX "keywordAlias_alias_key" ON "keywordAlias"("alias");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
