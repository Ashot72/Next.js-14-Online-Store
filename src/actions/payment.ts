"use server";

import { stripe } from "@/stripe";
import { auth } from "@/auth";
import db from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";

interface PaymentState {
  errors: {
    form?: string[];
  };
}

export async function createPayment(
  { token, total }: { token: string; total: number },
  formState: PaymentState,
): Promise<PaymentState> {
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
    const cart = await db.cart.findUnique({ where: { userId } });

    if (!cart) {
      return {
        errors: {
          form: [`No cart items`],
        },
      };
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: +(total * 100).toFixed(2),
      source: token,
    });

    await db.payments.create({
      data: {
        stripeId: charge.id,
        products: cart.products,
        user: { connect: { id: userId } },
      },
    });

    await db.cart.delete({
      where: { userId },
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

  redirect(paths.paymentsView());
}
