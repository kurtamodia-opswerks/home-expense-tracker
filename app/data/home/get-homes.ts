import "server-only";

import { homesTable } from "@/db/schema";
import { db } from "@/db/index";
import { unstable_cache } from "next/cache";
import { requireUser } from "../user/require-user";

export async function getHomes() {
  await requireUser();
  const homes = unstable_cache(
    async () => await db.select().from(homesTable).all(),
    ["homes"],
    { tags: ["homes"] }
  );
  return homes();
}
