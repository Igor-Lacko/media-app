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
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "continueAt" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Movie" ("continueAt", "description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus") SELECT "continueAt", "description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED'
);
INSERT INTO "new_Show" ("description", "id", "rating", "shortDescription", "thumbnailUrl", "title", "watchStatus") SELECT "description", "id", "rating", "shortDescription", "thumbnailUrl", "title", "watchStatus" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
