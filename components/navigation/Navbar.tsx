import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { KindeLinks } from "./KindeLinks";
import { Suspense } from "react";

export async function Navbar() {
  return (
    <div className="flex items-center justify-between container mx-auto px-4 md:px-8 py-4">
      <Link href="/">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Roomie<span className="text-primary">Split</span>
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
