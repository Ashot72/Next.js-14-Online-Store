import { Suspense } from "react";
import CategoryLoading from "@/components/common/category-loading";
import ProductLoading from "@/components/common/product-loading";
import ProductList from "@/components/home/products/product-list";
import CategoryList from "@/components/home/categories/category-list";
import { ProductWithData } from "@/db/queries/products";

interface HomeProps {
  fetchData: () => Promise<ProductWithData[]>;
}

export default async function Home({ fetchData }: HomeProps) {
  const products = await fetchData();

  return (
    <div className="grid grid-cols-5 gap-4 px-16">
      <div className="col-span-1 z-40">
        <h1 className="text-xl m-2">
          <Suspense fallback={<CategoryLoading />}>
            <CategoryList />
          </Suspense>
        </h1>
      </div>
      <div className="col-span-4 py-3">
        <Suspense fallback={<ProductLoading />}>
          <ProductList products={products} />
        </Suspense>
      </div>
    </div>
  );
}
