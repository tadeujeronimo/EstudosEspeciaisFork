/*
  Warnings:

  - You are about to drop the column `imagem` on the `Cardapio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cardapio" DROP COLUMN "imagem",
ADD COLUMN     "descricao" TEXT;
