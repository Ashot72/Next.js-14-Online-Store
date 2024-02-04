import { fetchCategories } from "@/db/queries/categories";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function CategoryView(
  { categoryId }: { categoryId: string },
) {
  const categories = await fetchCategories();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return null;
  }

  const children = categories.filter((c) => c.parentId === categoryId);
  const renderedChildren = children.map((child) => {
    return <CategoryView key={child.id} categoryId={child.id} />;
  });

  return (
    <div>
      <div className="text-gray-600 text-base text-nowrap p-1">
        <Button variant="flat" className="p-1">
          <Link href={`/${categoryId}`} className="px-2">{category.name}</Link>
        </Button>
      </div>

      <div className="pl-2">{renderedChildren}</div>
    </div>
  );
}
