-- AlterTable
ALTER TABLE "Episode" ADD COLUMN "continueAt" INTEGER;

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN "continueAt" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "description" TEXT,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "length" INTEGER,
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED',
    "continueAt" INTEGER
);
INSERT INTO "new_Movie" ("description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl") SELECT "description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "description" TEXT,
    "episodes" INTEGER NOT NULL,
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED'
);
INSERT INTO "new_Show" ("description", "episodes", "id", "rating", "shortDescription", "title") SELECT "description", "episodes", "id", "rating", "shortDescription", "title" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
