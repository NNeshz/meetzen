/*
  Warnings:

  - You are about to drop the column `ownerId` on the `company` table. All the data in the column will be lost.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_ownerId_fkey";

-- DropIndex
DROP INDEX "company_ownerId_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyId" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
