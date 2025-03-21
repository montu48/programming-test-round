"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", category_controller_1.getCategoriesHandler);
router.get("/:id", category_controller_1.getCategoryByIdHandler);
router.post("/", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, category_controller_1.createCategoryHandler);
router.put("/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, category_controller_1.updateCategoryHandler);
router.delete("/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, category_controller_1.deleteCategoryHandler);
exports.default = router;
