import { ProductWithData } from "@/db/queries/products";
import { Snippet } from "@nextui-org/react";
import ProductView from "@/components/home/products/product-view";

export default async function ProductList(
  { products }: { products: ProductWithData[] },
) {
  if (products.length === 0) {
    return (
      <Snippet
        className="flex justify-center bg-opacity-65"
        hideCopyButton
        hideSymbol
        color="primary"
        variant="solid"
      >
        <div>No Product Found.</div>
      </Snippet>
    );
  }

  const renderedProducts = products.map((product) => (
    <ProductView
      key={product.id}
      product={product}
    />
  ));

  return (
    <div className="space-y-3">
      {renderedProducts}
    </div>
  );
}
