"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import db from "@/db";
import paths from "@/paths";

const createCategoryOrUpdateSchema = z.object({
  name: z.string().min(4).regex(/^[a-zA-Z\s\&]*$/, {
    message: "Must be letters, spaces and ampersands",
  }),
});

interface CategoryFormState {
  errors: {
    name?: string[];
    form?: string[];
  };
  success?: boolean;
}

export async function createOrUpdateCategory(
  { parentId, name }: { parentId?: string; name?: string },
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const result = createCategoryOrUpdateSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        form: ["You must sign in to do this."],
      },
    };
  }

  try {
    if (name) {
      await db.category.update({
        where: { id: parentId },
        data: {
          name: result.data.name,
        },
      });
    } else {
       await db.category.create({
        data: {
          name: result.data.name,
          parentId: parentId,
          userId: session.user.id,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          form: ["Something went wrong..."],
        },
      };
    }
  }

  revalidatePath(paths.homeView());

  /*
  const categories = await db.category.findMany();
  categories.forEach(category => {
    revalidatePath(`/${category.id}`)
  });
  */

  return {
    errors: {},
    success: true,
  };
}

export async function deleteCategory(
  { id }: { id: string },
  formState: CategoryFormState,
): Promise<CategoryFormState> {
  try {
    const categories = await db.category.findMany({
      where: { parentId: id },
    });

    if (categories.length > 0) {
      return {
        errors: {
          form: [
            "This category has a parent category. Please delete the parent category first",
          ],
        },
      };
    } else {
      const prodcuts = await db.product.findMany({
        where: { categoryId: id },
      });

      if (prodcuts.length > 0) {
        return {
          errors: {
            form: [
              "There are products attached to this category. Please delete them first.",
            ],
          },
        };
      }
    }

    await db.category.delete({
      where: { id },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          form: ["Something went wrong..."],
        },
      };
    }
  }

  revalidatePath(paths.homeView());

  return {
    errors: {},
  };
}
