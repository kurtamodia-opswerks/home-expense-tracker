import "server-only";

import { usersTable } from "@/db/schema";
import { db } from "@/db/index";
import { unstable_cache } from "next/cache";

export async function getUsers() {
  const users = unstable_cache(
    async () => await db.select().from(usersTable).all(),
    ["users"],
    { tags: ["users"] }
  );
  return users();
}
