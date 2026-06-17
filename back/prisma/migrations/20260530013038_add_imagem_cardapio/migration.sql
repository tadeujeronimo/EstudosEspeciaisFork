/*
  Warnings:

  - You are about to drop the column `numeroMesa` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Cardapio" ADD COLUMN     "imagem" TEXT;

-- AlterTable
ALTER TABLE "public"."Pedido" DROP COLUMN "numeroMesa";
