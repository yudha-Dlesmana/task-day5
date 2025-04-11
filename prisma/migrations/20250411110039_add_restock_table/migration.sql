-- CreateTable
CREATE TABLE "Restock" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restock" ADD CONSTRAINT "Restock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
