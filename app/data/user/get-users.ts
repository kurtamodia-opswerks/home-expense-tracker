import "server-only";

import { usersTable } from "@/db/schema";
import { db } from "@/db/index";
import { unstable_cache } from "next/cache";
import { requireUser } from "./require-user";

export async function getUsers() {
  await requireUser();
  const users = unstable_cache(
    async () => await db.select().from(usersTable).all(),
    ["users"],
    { tags: ["users"] }
  );
  return users();
}
