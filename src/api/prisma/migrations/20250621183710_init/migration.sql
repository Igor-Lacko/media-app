-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonId" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "description" TEXT,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "length" INTEGER,
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("continueAt", "description", "episodeNumber", "id", "length", "rating", "seasonId", "thumbnailUrl", "title", "videoUrl") SELECT coalesce("continueAt", 0) AS "continueAt", "description", "episodeNumber", "id", "length", "rating", "seasonId", "thumbnailUrl", "title", "videoUrl" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Lecture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "subjectId" INTEGER NOT NULL,
    "length" INTEGER,
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lecture_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lecture" ("continueAt", "id", "length", "subjectId", "title", "videoUrl") SELECT coalesce("continueAt", 0) AS "continueAt", "id", "length", "subjectId", "title", "videoUrl" FROM "Lecture";
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
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED',
    "continueAt" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Movie" ("continueAt", "description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus") SELECT coalesce("continueAt", 0) AS "continueAt", "description", "id", "length", "rating", "shortDescription", "thumbnailUrl", "title", "videoUrl", "watchStatus" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
