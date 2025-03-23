/*
  Warnings:

  - You are about to drop the column `imagemURL` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `imagemURL` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `imagemUrl` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "imagemURL",
ADD COLUMN     "imagemUrl" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "imagemURL",
ADD COLUMN     "imagemUrl" TEXT NOT NULL;
