import Link from "next/link";
import { Suspense } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "@/components/search-input";

export default function Header() {
  return (
    <Navbar className="my-2">
      <NavbarContent>
        <NavbarItem>
          <Link href="/" className="px-2">Home</Link>
          <Link href="/categories" className="px-2">Categories</Link>
          <Link href="/cart" className="px-2">Shopping Cart</Link>
          <Link href="/payments" className="px-2">Orders</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
