"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowStockProducts = exports.updateStock = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategories = yield prisma.category.findMany({
        where: { id: { in: data.categoryIds } },
        select: { id: true },
    });
    const existingCategoryIds = existingCategories.map((category) => category.id);
    if (existingCategoryIds.length !== data.categoryIds.length) {
        throw new Error("One or more category IDs are invalid.");
    }
    return yield prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: new library_1.Decimal(data.price),
            quantity: data.quantity,
            categories: {
                connect: existingCategoryIds.map((id) => ({ id })),
            },
        },
        include: {
            categories: true,
        },
    });
});
exports.createProduct = createProduct;
const getProducts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {};
    if (filters === null || filters === void 0 ? void 0 : filters.name) {
        whereClause.name = { contains: filters.name, mode: "insensitive" };
    }
    if (filters === null || filters === void 0 ? void 0 : filters.categoryId) {
        whereClause.categories = { some: { id: filters.categoryId } };
    }
    if ((filters === null || filters === void 0 ? void 0 : filters.minPrice) || (filters === null || filters === void 0 ? void 0 : filters.maxPrice)) {
        whereClause.price = {};
        if (filters.minPrice)
            whereClause.price.gte = filters.minPrice;
        if (filters.maxPrice)
            whereClause.price.lte = filters.maxPrice;
    }
    if (filters === null || filters === void 0 ? void 0 : filters.stock) {
        if (filters.stock === "in_stock")
            whereClause.stock = { gt: 0 };
        if (filters.stock === "out_of_stock")
            whereClause.stock = { equals: 0 };
        if (filters.stock === "low_stock")
            whereClause.stock = { lte: 5 };
    }
    return yield prisma.product.findMany({
        where: whereClause,
        include: { categories: true },
    });
});
exports.getProducts = getProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.findUnique({ where: { id } });
});
exports.getProductById = getProductById;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.update({ where: { id }, data });
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.delete({ where: { id } });
});
exports.deleteProduct = deleteProduct;
const updateStock = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new Error("Product not found");
    const newStock = product.stock + quantity;
    if (newStock < 0)
        throw new Error("Insufficient stock");
    return prisma.product.update({
        where: { id: productId },
        data: { stock: newStock },
    });
});
exports.updateStock = updateStock;
const getLowStockProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.product.findMany({
        where: {
            stock: { lte: prisma.product.fields.threshold },
        },
    });
});
exports.getLowStockProducts = getLowStockProducts;
