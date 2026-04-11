/*
  Warnings:

  - Added the required column `filename` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Uploads" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "user" DROP NOT NULL;
