import { fetchCategories } from "@/db/queries/categories";
import Link from "next/link";
import CategoryForm from "@/components/auth/categories/category-form";
import { auth } from "@/auth";
import { Avatar, Button } from "@nextui-org/react";
import CategoryDelete from "@/components/auth/categories/category-delete";

export default async function CategoryView(
  { categoryId }: { categoryId: string },
) {
  const session = await auth();

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
    <div className="p-4 border rounded-xl mt-2 mb-1">
      <div className="flex gap-3">
        <Avatar
          src={category.user.image || ""}
          isBordered
        />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-gray-500">
            {category.user.name}
          </p>
          <div className="flex">
            <div className="text-red-900 m-2">{category.name}</div>
            {category.userId === session?.user?.id
              ? (
                <div className="flex gap-2 flex-grow">
                  <CategoryForm parentId={category.id} name={category.name} />
                  <CategoryDelete name={category.name} id={category.id} />
                </div>
              )
              : <div className="flex gap-2 flex-grow" />}
            <div>
              <Button color="primary" variant="light">
                <Link color="primary" href={`/products/${categoryId}`}>
                  Products
                </Link>
              </Button>
            </div>
          </div>

          <CategoryForm parentId={category.id} />
        </div>
      </div>
      <div className="pl-2">{renderedChildren}</div>
    </div>
  );
}
