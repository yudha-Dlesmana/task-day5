import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getDetailProduct, restockProduct, totalStock, updateProducts } from "../controllers/product";

const router = Router()

router.get("/products/total-stock", totalStock) // aman

router.post("/products", createProduct); // aman
router.get("/products", getAllProducts); // aman
router.patch("/products", updateProducts); // aman
router.patch("/products/restock", restockProduct); // aman
router.get("/products/:id", getDetailProduct); // aman
router.delete("/products/:id", deleteProduct); // aman

export default router;