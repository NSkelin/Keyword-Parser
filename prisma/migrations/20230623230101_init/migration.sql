-- CreateTable
CREATE TABLE "keywords" (
    "title" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "keyword" (
    "displayName" TEXT NOT NULL PRIMARY KEY,
    "keywordsTitle" TEXT,
    CONSTRAINT "keyword_keywordsTitle_fkey" FOREIGN KEY ("keywordsTitle") REFERENCES "keywords" ("title") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "keywordAlias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "keywordDisplayName" TEXT,
    CONSTRAINT "keywordAlias_keywordDisplayName_fkey" FOREIGN KEY ("keywordDisplayName") REFERENCES "keyword" ("displayName") ON DELETE SET NULL ON UPDATE CASCADE
);
