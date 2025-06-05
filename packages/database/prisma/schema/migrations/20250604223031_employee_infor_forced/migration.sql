/*
  Warnings:

  - Made the column `phoneNumber` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
