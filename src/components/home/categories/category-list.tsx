import { fetchCategories } from "@/db/queries/categories";
import CategoryView from "@/components/home/categories/category-view";

export default async function CategoryList() {
  const categories = await fetchCategories();

  const topLevelCategories = categories.filter(
    (category) => category.parentId === null,
  );

  const renderedCategories = topLevelCategories.map((category) => (
    <CategoryView
      key={category.id}
      categoryId={category.id}
    />
  ));

  return (
    <div>
      {renderedCategories}
    </div>
  );
}
