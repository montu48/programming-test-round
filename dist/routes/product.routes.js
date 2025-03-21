"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const product_controller_1 = require("../controllers/product.controller");
const reports_controller_1 = require("../controllers/reports.controller");
const router = express_1.default.Router();
router.get("/", product_controller_1.getProductsHandler);
router.get("/:id", product_controller_1.getProductByIdHandler);
router.post("/", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, product_controller_1.createProductHandler);
router.put("/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, product_controller_1.updateProductHandler);
router.delete("/:id", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, product_controller_1.deleteProductHandler);
router.put("/stock", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, product_controller_1.updateStockHandler);
router.get("/low-stock", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, product_controller_1.getLowStockHandler);
router.get("/reports", auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, reports_controller_1.getReportsHandler);
exports.default = router;
