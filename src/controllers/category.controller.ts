import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to create category" });
  }
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
  const categories = await getCategories();
  res.json(categories);
};

export const getCategoryByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getCategoryById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Failed to update category" });
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    await deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete category" });
  }
};
