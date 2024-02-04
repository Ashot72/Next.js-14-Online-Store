import Home from "@/components/home/home";
import { fetchProductsBySearchTerm } from "@/db/queries/products";
import paths from "@/paths";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect(paths.homeView());
  }

  return (
    <div>
      <Home fetchData={() => fetchProductsBySearchTerm(term)} />
    </div>
  );
}
