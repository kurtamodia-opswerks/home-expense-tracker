// data/user-mutations.ts
import { db } from "@/db";
import { usersTable, InsertUser, SelectUser } from "@/db/schema";
import { eq } from "drizzle-orm";

// Insert user
export async function insertUser(user: InsertUser): Promise<SelectUser[]> {
  return db.insert(usersTable).values(user).returning();
}

// Delete user
export async function removeUser(userId: number): Promise<void> {
  await db.delete(usersTable).where(eq(usersTable.id, userId));
}
