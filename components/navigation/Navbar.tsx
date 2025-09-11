import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { KindeLinks } from "./KindeLinks";
import { Suspense } from "react";

export async function Navbar() {
  return (
    <div className="flex items-center justify-between container mx-auto px-4 md:px-8 py-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">
          Expense<span className="text-primary">Tracker</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <Suspense fallback={<span>Loading...</span>}>
          <NavLinks />
        </Suspense>

        <Suspense fallback={<span>Loading...</span>}>
          <KindeLinks />
        </Suspense>
      </div>
    </div>
  );
}
