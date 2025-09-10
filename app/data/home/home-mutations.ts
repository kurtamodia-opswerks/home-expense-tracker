import { db } from "@/db";
import { eq } from "drizzle-orm";
import { homesTable, SelectHome, usersTable } from "@/db/schema";

/**
 * Creates a new home in the database.
 */
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
/**
 * Fetch all homes.
 */
export async function getHomes() {
  return db.select().from(homesTable);
}

export async function assignUserToHomeMutation(userId: number, homeId: number) {
  return db.update(usersTable).set({ homeId }).where(eq(usersTable.id, userId));
}
