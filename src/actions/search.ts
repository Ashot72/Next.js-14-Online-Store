"use server";

import { redirect } from "next/navigation";
import paths from "@/paths";

export async function search(formData: FormData) {
  const term = formData.get("term");

  if (typeof term !== "string" || !term) {
    redirect(paths.homeView());
  }

  redirect(paths.searchView(term));
}
