"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import db from "@/db";
import paths from "@/paths";

const createProductOrUpdateSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(10),
  price: z.coerce.number()
    .gt(0, {
      message: "Must be positive number",
    })
    .multipleOf(0.01, {
      message: "Must have a maximum of two decimal places",
    }),
  count: z.coerce.number()
    .gt(0, {
      message: "Must be positive number",
    })
    .int(),
  image: z.string().min(1, {
    message: "Must upload an image",
  }),
});

interface ProductState {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    count?: string[];
    image?: string[];
    form?: string[];
  };
  success?: boolean;
}

export async function createOrUpdateProduct(
  { categoryId, productId }: { categoryId: string; productId?: string },
  formState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  const result = createProductOrUpdateSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    picture: formData.get("picture"),
    count: formData.get("count"),
    image: formData.get("image"),
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
    if (productId) {
      await db.product.update({
        where: { id: productId },
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          count: result.data.count,
          categoryId: categoryId,
          picture: result.data.image,
        },
      });
    } else {
      await db.product.create({
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          count: result.data.count,
          userId: session.user.id,
          categoryId: categoryId,
          picture: result.data.image,
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

  revalidatePath(paths.productsView(categoryId));

  return {
    errors: {},
    success: true,
  };
}

export async function deleteProduct(
  { id, categoryId }: { id: string; categoryId: string },
  formState: ProductState,
): Promise<ProductState> {
  try {
    await db.product.delete({
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

  revalidatePath(paths.productsView(categoryId));

  return {
    errors: {},
    success: true,
  };
}
