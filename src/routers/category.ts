import { Router } from "express";
import { 
  createCategory, 
  deleteCategory, 
  getAllCategory, 
  getDetailCategory, 
  totalProduct, 
  totalStockProduct, 
  updateCategory 
} from "../controllers/category";

const router = Router()

router.get("/categories/total-product", totalProduct); // aman
router.get("/categories/total-stock", totalStockProduct); // aman

router.post("/categories", createCategory); // aman
router.get("/categories", getAllCategory); // aman
router.get("/categories/:id", getDetailCategory); //aman
router.patch("/categories/:id", updateCategory); // aman
router.delete("/categories/:id", deleteCategory); // aman

export default router;
