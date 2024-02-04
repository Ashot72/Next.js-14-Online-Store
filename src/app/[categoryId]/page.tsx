import Home from "@/components/home/home";
import { fetchProductsByCategory } from "@/db/queries/products";
//import db from "@/db";

interface CategoryProducts {
  params: {
    categoryId: string;
  };
}

export default function CategoryProducts({ params }: CategoryProducts) {
  const { categoryId } = params;

  return <Home fetchData={() => fetchProductsByCategory(categoryId)} />;
}

/*
export async function generateStaticParams() {
  console.log("Generaring static pages")
  const categories = await db.category.findMany()

  return categories.map((category) => {
    return {
      categoryId: category.id
    }
  })
}
*/
