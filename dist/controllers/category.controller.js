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
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.getCategoryByIdHandler = exports.getCategoriesHandler = exports.createCategoryHandler = void 0;
const category_service_1 = require("../services/category.service");
const createCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_service_1.createCategory)(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to create category" });
    }
});
exports.createCategoryHandler = createCategoryHandler;
const getCategoriesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, category_service_1.getCategories)();
    res.json(categories);
});
exports.getCategoriesHandler = getCategoriesHandler;
const getCategoryByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, category_service_1.getCategoryById)(req.params.id);
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
exports.getCategoryByIdHandler = getCategoryByIdHandler;
const updateCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield (0, category_service_1.updateCategory)(req.params.id, req.body);
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to update category" });
    }
});
exports.updateCategoryHandler = updateCategoryHandler;
const deleteCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, category_service_1.deleteCategory)(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: "Failed to delete category" });
    }
});
exports.deleteCategoryHandler = deleteCategoryHandler;
