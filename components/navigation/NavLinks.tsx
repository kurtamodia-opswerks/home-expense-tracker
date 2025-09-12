import Link from "next/link";
import { User, CreditCard, Users, House } from "lucide-react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export async function NavLinks() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/home">
              <House />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/users">
              <User />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/transactions">
              <CreditCard />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Transactions</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/transaction-shares">
              <Users />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Transaction Shares</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
