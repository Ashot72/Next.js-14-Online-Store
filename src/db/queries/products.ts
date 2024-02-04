import type { Category, Product } from "@prisma/client";
import db from "@/db";
import { fecthFirstCategory } from "./categories";

export type ProductWithData = Product & {
  category: Category;
  user: { name: string; email: string; image: string | null };
};

export function fetchProductsByCategoryAndUser(
  categoryId: string,
  userId: string,
): Promise<ProductWithData[]> {
  return db.product.findMany({
    where: { categoryId, userId },
    orderBy: { dateAdded: "desc" },
    include: {
      category: true,
      user: true,
    },
  });
}

export async function fetchProductsByCategory(
  categoryId?: string,
): Promise<ProductWithData[]> {
  if (!categoryId) {
    const firstCategory = await fecthFirstCategory();
    categoryId = firstCategory?.id;
  }

  return db.product.findMany({
    where: { categoryId },
    include: {
      category: true,
      user: true,
    },
  });
}

export function fetchProductsBySearchTerm(
  term: string,
): Promise<ProductWithData[]> {
  return db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: term,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      category: true,
      user: true,
    },
  });
}
