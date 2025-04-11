import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getDetailProduct, restockProduct, totalStock, updateProducts } from "../controllers/product";

const router = Router()

router.get("/products/total-stock", totalStock)

router.post("/products", createProduct); 
router.get("/products", getAllProducts); 
router.patch("/products", updateProducts);
router.patch("/restock-products", restockProduct)
router.get("/products/:id", getDetailProduct) 
router.delete("/products/:id", deleteProduct); 

export default router;