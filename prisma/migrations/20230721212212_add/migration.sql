-- CreateTable
CREATE TABLE "resumeSection" (
    "title" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtTitle" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "resumeSectionTitle" TEXT NOT NULL,
    CONSTRAINT "position_resumeSectionTitle_fkey" FOREIGN KEY ("resumeSectionTitle") REFERENCES "resumeSection" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bullet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "fill" BOOLEAN NOT NULL,
    "positionId" INTEGER,
    CONSTRAINT "bullet_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bulletRestriction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "restriction" TEXT NOT NULL,
    "bulletId" INTEGER,
    CONSTRAINT "bulletRestriction_bulletId_fkey" FOREIGN KEY ("bulletId") REFERENCES "bullet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
