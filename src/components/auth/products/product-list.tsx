import { Fragment } from "react";
import { auth } from "@/auth";
import { fetchProductsByCategoryAndUser } from "@/db/queries/products";
import ProductForm from "@/components/auth/products/product-form";
import ProductDelete from "@/components/auth/products/product-delete";
import { lnToBr } from "@/helper";

export default async function ProductList(
  { categoryId }: { categoryId: string },
) {
  const session = await auth();

  if (!session || !session.user) {
    return <div>You must sign in to do this</div>;
  }

  const userId = session.user.id;
  const products = await fetchProductsByCategoryAndUser(categoryId, userId);

  return (
    <>
      <div className="font-semibold col-span-2">Name</div>
      <div className="font-semibold col-span-4">Description</div>
      <div className="font-semibold">Price</div>
      <div className="font-semibold">Count</div>
      <div className="font-semibold text-center">Action</div>
      {products.map((product) => (
        <Fragment key={product.id}>
          <div className="my-2 col-span-2">{product.name}</div>
          <div className="my-2 col-span-4">
            <span
              dangerouslySetInnerHTML={{
                __html: lnToBr(product.description),
              }}
            />
          </div>
          <div className="my-2">{product.price}</div>
          <div className="my-2">{product.count}</div>
          <div className="flex justify-center">
            <ProductForm
              categoryId={categoryId}
              product={product}
              placement="left-start"
            />
            <ProductDelete
              name={product.name}
              id={product.id}
              categoryId={categoryId}
            />
          </div>
        </Fragment>
      ))}
    </>
  );
}
