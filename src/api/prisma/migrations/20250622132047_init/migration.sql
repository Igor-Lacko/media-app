/*
  Warnings:

  - You are about to drop the column `nofEpisodes` on the `Show` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Show" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" REAL,
    "shortDescription" TEXT,
    "description" TEXT,
    "watchStatus" TEXT NOT NULL DEFAULT 'UNWATCHED'
);
INSERT INTO "new_Show" ("description", "id", "rating", "shortDescription", "title", "watchStatus") SELECT "description", "id", "rating", "shortDescription", "title", "watchStatus" FROM "Show";
DROP TABLE "Show";
ALTER TABLE "new_Show" RENAME TO "Show";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
