import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { getOrCreateUser } from "./get-or-create-user";

export const requireUser = cache(async () => {
  const user = await getOrCreateUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return user;
});
