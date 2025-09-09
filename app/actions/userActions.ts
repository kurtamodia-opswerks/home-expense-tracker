// app/actions/userActions.ts
"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { usersTable, InsertUser } from "@/db/schema";
import { revalidateTag } from "next/cache";

export async function addUser(user: InsertUser) {
  try {
    const inserted = await db.insert(usersTable).values(user).returning();
    revalidateTag("users");
    return { success: true, user: inserted[0] };
  } catch (error) {
    return { success: false, error: "Failed to add user" };
  }
}

export async function deleteUser(userId: number) {
  try {
    await db.delete(usersTable).where(eq(usersTable.id, userId));
    revalidateTag("users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}
