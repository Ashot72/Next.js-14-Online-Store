import CartView from "@/components/cart/cart-view";
import db from "@/db";
import { auth } from "@/auth";
import MessageBox from "@/components/common/message-box";
import { Cart } from "@prisma/client";
import CartStripe from "@/components/cart/cart-stripe";

export default async function CartList() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>You must sign in to do this</div>;
  }

  const user = session.user;

  let cart: Cart[];
  try {
    cart = await db.cart.findMany({
      where: { userId: user.id },
    });
  } catch (err) {
    if (err instanceof Error) {
      return <MessageBox message={err.message} color="danger" />;
    } else {
      return <div>Something went wrong...</div>;
    }
  }

  const total = () => {
    const cartProducts = cart.map((c) => c.products);
    return cartProducts.flat().reduce((total, item) => (item.price * item.qty) + total, 0);
  };

  const renderedCart = cart.map((c) =>
    c.products.map((p) => (
      <CartView
        key={p.id}
        cartProduct={p}
      />
    ))
  );

  return (
    <div className="space-y-3 px-16">
      {renderedCart}
      <div className="flex justify-end gap-3">
        {total() > 0 &&
          (
            <>
              <div className="mt-1">Total: ${total().toFixed(2)}</div>
              <CartStripe total={total()} email={user.email!} />
            </>
          )}
      </div>
    </div>
  );
}
