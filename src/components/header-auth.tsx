"use client";

import { useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import * as actions from "@/actions";
//import { auth } from '@/auth';

export default /*async*/ function HeaderAuth() {
  const { data: session, status } = useSession();
  //const session = await auth();

  let authContent: React.ReactNode;

  if (status === "loading") {
    authContent = null;
  } else if (session?.user) {
    authContent = (
      <Popover placement="left" backdrop="blur">
        <PopoverTrigger>
          <div className="flex gap-4 cursor-pointer">
            <div className="pt-2">{session.user.name}</div>
            <Avatar isBordered src={session.user.image || ""} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button className="cursor-pointer" type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign In
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
