/*
  Warnings:

  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - Made the column `image` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyDescription` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "companyDescription" SET NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "description",
ALTER COLUMN "duration" SET NOT NULL;
