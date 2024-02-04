"use server";

import { auth } from "@/auth";
import db from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

interface CartState {
  errors: {
    form?: string[];
  };
  success?: boolean;
}

export async function addToCart(
  formState: CartState,
  formData: FormData,
): Promise<CartState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        form: ["You must sign in to do this."],
      },
    };
  }

  try {
    const userId = session.user.id;
    const id = formData.get("productId") as string;
    const product = await db.product.findUnique({ where: { id } });

    if (product) {
      const cart = await db.cart.findFirst({ where: { userId } });

      if (cart) {
        let existingProduct = cart.products.find((p) => p.id == id);
        if (existingProduct) {
          existingProduct.qty += 1;

          await db.cart.update({
            where: { userId },
            data: {
              products: cart.products,
            },
          });
        } else {
          await db.cart.update({
            where: { userId },
            data: {
              products: [
                ...cart.products,
                {
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  picture: product.picture,
                  qty: 1,
                },
              ],
            },
          });
        }
      } else {
        await db.cart.create({
          data: {
            products: [{
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              picture: product.picture,
              qty: 1,
            }],
            user: { connect: { id: userId } },
          },
        });
      }
    } else {
      return {
        errors: {
          form: [`Product with Id '${id}' not found`],
        },
      };
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

  //revalidatePath(paths.cartView());

  return {
    errors: {},
    success: true,
  };
}

export async function add(
  formState: CartState,
  formData: FormData,
): Promise<CartState> {
  return addOrRemove(formState, formData, true);
}

export async function remove(
  formState: CartState,
  formData: FormData,
): Promise<CartState> {
  return addOrRemove(formState, formData, false);
}

async function addOrRemove(
  formState: CartState,
  formData: FormData,
  shouldAdd: boolean,
): Promise<CartState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        form: ["You must sign in to do this."],
      },
    };
  }

  try {
    const userId = session.user.id;
    const id = formData.get("productId") as string;
    const product = await db.product.findUnique({ where: { id } });

    if (product) {
      const cart = await db.cart.findFirst({ where: { userId } });

      if (cart) {
        let existingProduct = cart.products.find((p) => p.id === id);
        if (existingProduct) {
          shouldAdd ? existingProduct.qty += 1 : existingProduct.qty -= 1;

          if (existingProduct.qty === 0) {
            if (cart.products.length === 1) {
              await db.cart.delete({
                where: { userId },
              });
            } else {
              let otherProducts = cart.products.filter((p) => p.id !== id);

              await db.cart.update({
                where: { userId },
                data: {
                  products: otherProducts,
                },
              });
            }
          } else {
            await db.cart.update({
              where: { userId },
              data: {
                products: cart.products,
              },
            });
          }
        }
      } else {
        return {
          errors: {
            form: [`Product with Id '${id}' not found`],
          },
        };
      }
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

  revalidatePath(paths.cartView());

  return {
    errors: {},
    success: true,
  };
}
