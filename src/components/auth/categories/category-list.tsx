import { fetchCategories } from "@/db/queries/categories";
import CategoryView from "@/components/auth/categories/category-view";

export default async function CategoryList() {
  const categories = await fetchCategories();

  const topLevelCategories = categories.filter(
    (category) => category.parentId === null,
  );

  const renderedCategories = topLevelCategories.map((category) => (
    <div key={category.id} className="px-16">
      <CategoryView
        key={category.id}
        categoryId={category.id}
      />
    </div>
  ));

  return (
    <div className="space-y-3">
      {renderedCategories}
    </div>
  );
}
