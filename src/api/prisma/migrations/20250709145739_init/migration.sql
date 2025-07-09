/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `subjectId` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Subject";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "toWatch" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lecture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lectureNumber" INTEGER NOT NULL,
    "videoUrl" TEXT,
    "courseId" INTEGER NOT NULL,
    "watchStatus" TEXT NOT NULL DEFAULT 'NOT_WATCHED',
    "length" INTEGER,
    "lastWatchedAt" INTEGER,
    "continueAt" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lecture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lecture" ("continueAt", "id", "lastWatchedAt", "lectureNumber", "length", "title", "videoUrl", "watchStatus") SELECT "continueAt", "id", "lastWatchedAt", "lectureNumber", "length", "title", "videoUrl", "watchStatus" FROM "Lecture";
DROP TABLE "Lecture";
ALTER TABLE "new_Lecture" RENAME TO "Lecture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
