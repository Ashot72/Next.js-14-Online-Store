"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

export default function SearchInput() {
  const searchParam = useSearchParams();

  return (
    <form action={actions.search}>
      <Input
        name="term"
        size="sm"
        placeholder="Search"
        defaultValue={searchParam.get("term") || ""}
      />
    </form>
  );
}
