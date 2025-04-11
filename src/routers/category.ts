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

router.get("/categories/total-product", totalProduct);
router.get("/categories/total-stock", totalStockProduct);

router.post("/categories", createCategory); 
router.get("/categories", getAllCategory); 
router.get("/categories/:id", getDetailCategory); 
router.patch("/categories/:id", updateCategory); 
router.delete("/categories/:id", deleteCategory); 

export default router;
