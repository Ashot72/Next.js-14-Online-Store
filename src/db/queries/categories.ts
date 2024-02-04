import type { Category } from "@prisma/client";
import { cache } from "react";
import db from "@/db";

export type CategoryWithUser = Category & {
  user: { name: string; image: string | null };
};

export const fetchCategories = cache((): Promise<CategoryWithUser[]> => {
  console.log("fetch categories")
  return db.category.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});

export function fecthFirstCategory(): Promise<Category | null> {
  return db.category.findFirst();
}
