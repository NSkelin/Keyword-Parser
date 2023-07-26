-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyword" (
    "displayName" TEXT NOT NULL PRIMARY KEY,
    "proficient" BOOLEAN NOT NULL DEFAULT false,
    "keywordsTitle" TEXT NOT NULL,
    CONSTRAINT "keyword_keywordsTitle_fkey" FOREIGN KEY ("keywordsTitle") REFERENCES "keywordCollection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_keyword" ("displayName", "keywordsTitle") SELECT "displayName", "keywordsTitle" FROM "keyword";
DROP TABLE "keyword";
ALTER TABLE "new_keyword" RENAME TO "keyword";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
