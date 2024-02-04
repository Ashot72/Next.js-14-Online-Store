import db from "@/db";
import MessageBox from "@/components/common/message-box";
import ProductForm from "@/components/auth/products/product-form";
import ProductList from "@/components/auth/products/product-list";

interface ProductsProps {
  params: {
    categoryId: string;
  };
}

export default async function Products({ params }: ProductsProps) {
  const { categoryId } = params;

  let category;
  try {
    category = await db.category.findUnique({
      where: { id: categoryId },
    });
  } catch (err) {
    if (err instanceof Error) {
      return <MessageBox message={err.message} color="danger" />;
    } else {
      return <div>Something went wrong...</div>;
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-center font-medium text-lg">{category?.name}</h1>
        <ProductForm categoryId={categoryId} placement="right-start" />
      </div>
      <div className="grid grid-cols-9 gap-4 px-16">
        <ProductList categoryId={categoryId} />
      </div>
    </div>
  );
}
