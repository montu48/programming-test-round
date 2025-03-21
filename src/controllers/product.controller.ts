import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockProducts
} from "../services/product.service";

export const createProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
};

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, minPrice, maxPrice, stock } = req.query;

    const filters = {
      name: name as string,
      categoryId: categoryId as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      stock: stock as "in_stock" | "out_of_stock" | "low_stock",
    };

    const products = await getProducts(filters);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


export const getProductByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product" });
  }
};


export const updateStockHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId, quantity } = req.body;
    const updatedProduct = await updateStock(productId, quantity);
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ error: "Error" });
  }
};

export const getLowStockHandler = async (
  _req: Request,
  res: Response
): Promise<any> => {
  const products = await getLowStockProducts();
  return res.json(products);
};