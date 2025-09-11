import { db } from "@/db";
import { eq } from "drizzle-orm";
import { homesTable, SelectHome, usersTable } from "@/db/schema";

export async function createHomeMutation(
  name: string,
  address: string
): Promise<SelectHome> {
  const result = await db
    .insert(homesTable)
    .values({ name, address })
    .returning();
  return result[0];
}

export async function assignUserToHomeMutation(userId: number, homeId: number) {
  return db.update(usersTable).set({ homeId }).where(eq(usersTable.id, userId));
}

export async function leaveHomeMutation(userId: number) {
  return db
    .update(usersTable)
    .set({ homeId: null })
    .where(eq(usersTable.id, userId));
}
