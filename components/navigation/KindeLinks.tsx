import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function KindeLinks() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <>
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
    </>
  );
}
