import CategoryForm from "@/components/auth/categories/category-form";
import CategoryList from "@/components/auth/categories/category-list";

export default function Categories() {
  return (
    <div className="space-y-3">
      <CategoryForm isOpen />
      <CategoryList />
    </div>
  );
}
