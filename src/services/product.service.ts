import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number | string; 
  quantity: number;
  categoryIds: string[];
}) => {
  
  const existingCategories = await prisma.category.findMany({
    where: { id: { in: data.categoryIds } },
    select: { id: true },
  });

  const existingCategoryIds = existingCategories.map((category) => category.id);

  if (existingCategoryIds.length !== data.categoryIds.length) {
    throw new Error("One or more category IDs are invalid.");
  }

  
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: new Decimal(data.price), 
      quantity: data.quantity, 
      categories: {
        connect: existingCategoryIds.map((id) => ({ id })), 
      },
    },
    include: {
      categories: true, 
    },
  });
};


export const getProducts = async (filters?: {
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: "in_stock" | "out_of_stock" | "low_stock";
}) => {
  const whereClause: any = {};


  if (filters?.name) {
    whereClause.name = { contains: filters.name, mode: "insensitive" };
  }


  if (filters?.categoryId) {
    whereClause.categories = { some: { id: filters.categoryId } };
  }


  if (filters?.minPrice || filters?.maxPrice) {
    whereClause.price = {};
    if (filters.minPrice) whereClause.price.gte = filters.minPrice;
    if (filters.maxPrice) whereClause.price.lte = filters.maxPrice;
  }


  if (filters?.stock) {
    if (filters.stock === "in_stock") whereClause.stock = { gt: 0 };
    if (filters.stock === "out_of_stock") whereClause.stock = { equals: 0 };
    if (filters.stock === "low_stock") whereClause.stock = { lte: 5 };
  }

  return await prisma.product.findMany({
    where: whereClause,
    include: { categories: true },
  });
};


export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
  }>
) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};

export const updateStock = async (productId: string, quantity: number) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  const newStock = product.stock + quantity;
  if (newStock < 0) throw new Error("Insufficient stock");

  return prisma.product.update({
    where: { id: productId },
    data: { stock: newStock },
  });
};

export const getLowStockProducts = async () => {
  return prisma.product.findMany({
    where: {
      stock: { lte: prisma.product.fields.threshold },
    },
  });
};

