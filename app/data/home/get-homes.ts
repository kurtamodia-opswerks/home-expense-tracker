import "server-only";

import { homesTable } from "@/db/schema";
import { db } from "@/db/index";
import { unstable_cache } from "next/cache";

export async function getHomes() {
  const homes = unstable_cache(
    async () => await db.select().from(homesTable).all(),
    ["homes"],
    { tags: ["homes"] }
  );
  return homes();
}
