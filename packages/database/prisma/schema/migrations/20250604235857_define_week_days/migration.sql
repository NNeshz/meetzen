/*
  Warnings:

  - The `availableDays` column on the `company` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "company" DROP COLUMN "availableDays",
ADD COLUMN     "availableDays" "WeekDay"[];
