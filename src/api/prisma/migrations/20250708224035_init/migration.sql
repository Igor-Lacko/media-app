-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonId" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "videoUrl" TEXT,
    "length" INTEGER,
    "lastWatchedAt" INTEGER,
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    "watchStatus" TEXT NOT NULL DEFAULT 'NOT_WATCHED',
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("continueAt", "episodeNumber", "id", "lastWatchedAt", "length", "rating", "seasonId", "shortDescription", "title", "videoUrl", "watchStatus") SELECT "continueAt", "episodeNumber", "id", "lastWatchedAt", "length", "rating", "seasonId", "shortDescription", "title", "videoUrl", "watchStatus" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Lecture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lectureNumber" INTEGER NOT NULL,
    "videoUrl" TEXT,
    "subjectId" INTEGER NOT NULL,
    "watchStatus" TEXT NOT NULL DEFAULT 'NOT_WATCHED',
    "length" INTEGER,
    "lastWatchedAt" INTEGER,
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lecture_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lecture" ("continueAt", "id", "lastWatchedAt", "lectureNumber", "length", "subjectId", "title", "videoUrl", "watchStatus") SELECT "continueAt", "id", "lastWatchedAt", "lectureNumber", "length", "subjectId", "title", "videoUrl", "watchStatus" FROM "Lecture";
DROP TABLE "Lecture";
ALTER TABLE "new_Lecture" RENAME TO "Lecture";
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "description" TEXT,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "length" INTEGER,
    "lastWatchedAt" INTEGER,
    "watchStatus" TEXT NOT NULL DEFAULT 'NOT_WATCHED',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "continueAt" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Movie" ("continueAt", "description", "id", "isFavorite", "lastWatchedAt", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus") SELECT "continueAt", "description", "id", "isFavorite", "lastWatchedAt", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus" FROM "Movie";
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
    "watchStatus" TEXT NOT NULL DEFAULT 'NOT_WATCHED'
);
INSERT INTO "new_Show" ("description", "id", "isFavorite", "rating", "shortDescription", "thumbnailUrl", "title", "watchStatus") SELECT "description", "id", "isFavorite", "rating", "shortDescription", "thumbnailUrl", "title", "watchStatus" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
