/*
  Warnings:

  - Added the required column `endTime` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pmamEnd` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pmamStart` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `company` table without a default value. This is not possible if the table is not empty.
  - Made the column `mapsLocation` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "availableDays" TEXT[],
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "pmamEnd" TEXT NOT NULL,
ADD COLUMN     "pmamStart" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ALTER COLUMN "mapsLocation" SET NOT NULL;

-- CreateTable
CREATE TABLE "employee_availability" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "startTime" TEXT,
    "endTime" TEXT,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_availability_employeeId_date_key" ON "employee_availability"("employeeId", "date");

-- AddForeignKey
ALTER TABLE "employee_availability" ADD CONSTRAINT "employee_availability_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
