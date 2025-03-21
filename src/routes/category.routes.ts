import express from "express";
import {
  createCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/category.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getCategoriesHandler);
router.get("/:id", getCategoryByIdHandler);

router.post("/", authenticate, authorizeAdmin, createCategoryHandler);
router.put("/:id", authenticate, authorizeAdmin, updateCategoryHandler);
router.delete("/:id", authenticate, authorizeAdmin, deleteCategoryHandler);

export default router;
