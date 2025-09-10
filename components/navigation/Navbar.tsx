"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { User, CreditCard, Users } from "lucide-react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  return (
    <div className="flex items-center justify-between container mx-auto px-4 md:px-8 py-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">
          Expense<span className="text-primary">Tracker</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/users">
          <User />
        </Link>
        <Link href="/transactions">
          <CreditCard />
        </Link>
        <Link href="/transaction-shares">
          <Users />
        </Link>
        {user ? (
          <LogoutLink className={buttonVariants()}>Logout</LogoutLink>
        ) : (
          <>
            <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "outline" })}>
              Register
            </RegisterLink>
          </>
        )}
      </div>
    </div>
  );
}
