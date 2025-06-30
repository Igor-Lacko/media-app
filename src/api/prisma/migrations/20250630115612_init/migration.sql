/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Season" ADD COLUMN "title" TEXT;

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
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED',
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("continueAt", "episodeNumber", "id", "length", "rating", "seasonId", "shortDescription", "title", "videoUrl", "watchStatus") SELECT "continueAt", "episodeNumber", "id", "length", "rating", "seasonId", "shortDescription", "title", "videoUrl", "watchStatus" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Subject" ("id", "title") SELECT "id", "title" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
