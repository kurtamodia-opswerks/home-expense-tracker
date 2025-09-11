import Link from "next/link";
import { User, CreditCard, Users, House } from "lucide-react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function NavLinks() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <>
      {user && (
        <>
          <Link href="/home">
            <House />
          </Link>
          <Link href="/users">
            <User />
          </Link>
          <Link href="/transactions">
            <CreditCard />
          </Link>
          <Link href="/transaction-shares">
            <Users />
          </Link>
        </>
      )}
    </>
  );
}
