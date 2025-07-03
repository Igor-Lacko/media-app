/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Season` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN "timestamp" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "showId" INTEGER NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "rating" REAL,
    "description" TEXT,
    "shortDescription" TEXT,
    CONSTRAINT "Season_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("description", "id", "rating", "seasonNumber", "shortDescription", "showId") SELECT "description", "id", "rating", "seasonNumber", "shortDescription", "showId" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
