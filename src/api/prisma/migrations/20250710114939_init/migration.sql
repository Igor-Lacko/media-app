/*
  Warnings:

  - You are about to drop the column `imdbApiKey` on the `Settings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "omdbApiKey" TEXT
);
INSERT INTO "new_Settings" ("darkMode", "id") SELECT "darkMode", "id" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
