/*
  Warnings:

  - You are about to drop the column `date` on the `employee_availability` table. All the data in the column will be lost.
  - Added the required column `day` to the `employee_availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "employee_availability_employeeId_date_key";

-- AlterTable
ALTER TABLE "employee_availability" DROP COLUMN "date",
ADD COLUMN     "day" "WeekDay" NOT NULL;
