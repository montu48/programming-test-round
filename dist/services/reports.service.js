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
exports.getInventoryReports = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getInventoryReports = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalStockValue = yield prisma.product.aggregate({
        _sum: { price: true },
    });
    const outOfStockCount = yield prisma.product.count({
        where: { stock: 0 },
    });
    const lowStockCount = yield prisma.product.count({
        where: { stock: { lte: 5, gt: 0 } },
    });
    const categoryStockDistribution = yield prisma.category.findMany({
        select: {
            name: true,
            _count: { select: { products: true } },
        },
    });
    return {
        totalStockValue: totalStockValue._sum.price || 0,
        outOfStockCount,
        lowStockCount,
        categoryStockDistribution,
    };
});
exports.getInventoryReports = getInventoryReports;
