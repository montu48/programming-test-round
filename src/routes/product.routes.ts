import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";
import {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
  updateStockHandler,
  getLowStockHandler,
} from "../controllers/product.controller";
import { getReportsHandler } from "../controllers/reports.controller";

const router = express.Router();

router.get("/", getProductsHandler);

router.get("/:id", getProductByIdHandler);

router.post("/", authenticate, authorizeAdmin, createProductHandler);
router.put("/:id", authenticate, authorizeAdmin, updateProductHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteProductHandler);

router.put("/stock", authenticate, authorizeAdmin, updateStockHandler);
router.get("/low-stock", authenticate, authorizeAdmin, getLowStockHandler);



export default router;
