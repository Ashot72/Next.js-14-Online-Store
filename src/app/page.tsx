import Home from "@/components/home/home";
import { fetchProductsByCategory } from "@/db/queries/products";

export default function CategoryProducts() {
  return <Home fetchData={fetchProductsByCategory} />;
}
