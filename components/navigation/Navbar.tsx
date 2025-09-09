"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { User, CreditCard, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const pathname = usePathname();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const navItems = [
    { href: "/", icon: User, label: "Users" },
    { href: "/transactions", icon: CreditCard, label: "Transactions" },
    { href: "/transaction-shares", icon: Users, label: "Transaction Shares" },
  ];

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="w-full flex justify-center gap-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <NavigationMenuItem key={href}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={`p-2 rounded transition-colors ${
                        isActive ? "text-blue-500" : ""
                      }`}
                    >
                      <Icon size={24} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuItem>
          <div>
            {user ? (
              <LogoutLink className={buttonVariants()}>Logout</LogoutLink>
            ) : (
              <>
                {" "}
                <LoginLink className={buttonVariants()}>Sign in</LoginLink>
                <RegisterLink className={buttonVariants()}>
                  Sign up
                </RegisterLink>
              </>
            )}
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
