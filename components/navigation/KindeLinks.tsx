import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function KindeLinks() {
  const { isAuthenticated } = getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();

  return (
    <>
      {isUserAuthenticated ? (
        <LogoutLink className={buttonVariants()} postLogoutRedirectURL="/">
          Logout
        </LogoutLink>
      ) : (
        <>
          <LoginLink className={buttonVariants()} postLoginRedirectURL="/">
            Login
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: "outline" })}>
            Register
          </RegisterLink>
        </>
      )}
    </>
  );
}
