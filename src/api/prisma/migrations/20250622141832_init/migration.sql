-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EntertainmentGenre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre" TEXT NOT NULL,
    "movieId" INTEGER,
    "showId" INTEGER,
    CONSTRAINT "EntertainmentGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EntertainmentGenre_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EntertainmentGenre" ("genre", "id", "movieId", "showId") SELECT "genre", "id", "movieId", "showId" FROM "EntertainmentGenre";
DROP TABLE "EntertainmentGenre";
ALTER TABLE "new_EntertainmentGenre" RENAME TO "EntertainmentGenre";
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
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED',
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("continueAt", "description", "episodeNumber", "id", "length", "rating", "seasonId", "thumbnailUrl", "title", "videoUrl", "watchStatus") SELECT "continueAt", "description", "episodeNumber", "id", "length", "rating", "seasonId", "thumbnailUrl", "title", "videoUrl", "watchStatus" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "lectureId" INTEGER NOT NULL,
    CONSTRAINT "Note_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("content", "id", "lectureId") SELECT "content", "id", "lectureId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "showId" INTEGER NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "rating" REAL,
    "description" TEXT,
    CONSTRAINT "Season_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("description", "id", "rating", "seasonNumber", "showId") SELECT "description", "id", "rating", "seasonNumber", "showId" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
