import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInventoryReports = async () => {
  const totalStockValue = await prisma.product.aggregate({
    _sum: { price: true },
  });

  const outOfStockCount = await prisma.product.count({
    where: { stock: 0 },
  });

  const lowStockCount = await prisma.product.count({
    where: { stock: { lte: 5, gt: 0 } },
  });

  const categoryStockDistribution = await prisma.category.findMany({
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
};
