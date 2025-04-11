-- DropForeignKey
ALTER TABLE "Restock" DROP CONSTRAINT "Restock_productId_fkey";

-- AddForeignKey
ALTER TABLE "Restock" ADD CONSTRAINT "Restock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
