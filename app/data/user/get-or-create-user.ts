import { db } from "@/db/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidateTag } from "next/cache";

export async function getOrCreateUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }

  // Look up by Kinde ID
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.kindeId, user.id))
    .get();

  if (existing) return existing;

  // If not found, insert new
  const inserted = await db
    .insert(usersTable)
    .values({
      kindeId: user.id,
      name: user.given_name ?? user.email ?? "Unknown",
      email: user.email!,
    })
    .returning()
    .get();

  return inserted;
}
