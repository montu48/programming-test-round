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
exports.getLowStockHandler = exports.updateStockHandler = exports.deleteProductHandler = exports.updateProductHandler = exports.getProductByIdHandler = exports.getProductsHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../services/product.service");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.createProduct)(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to create product" });
    }
});
exports.createProductHandler = createProductHandler;
const getProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryId, minPrice, maxPrice, stock } = req.query;
        const filters = {
            name: name,
            categoryId: categoryId,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            stock: stock,
        };
        const products = yield (0, product_service_1.getProducts)(filters);
        res.json({ success: true, data: products });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getProductsHandler = getProductsHandler;
const getProductByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.getProductById)(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
});
exports.getProductByIdHandler = getProductByIdHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield (0, product_service_1.updateProduct)(req.params.id, req.body);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to update product" });
    }
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, product_service_1.deleteProduct)(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: "Failed to delete product" });
    }
});
exports.deleteProductHandler = deleteProductHandler;
const updateStockHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const updatedProduct = yield (0, product_service_1.updateStock)(productId, quantity);
        return res.json(updatedProduct);
    }
    catch (error) {
        return res.status(400).json({ error: "Error" });
    }
});
exports.updateStockHandler = updateStockHandler;
const getLowStockHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.getLowStockProducts)();
    return res.json(products);
});
exports.getLowStockHandler = getLowStockHandler;
