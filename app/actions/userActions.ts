// app/actions/userActions.ts
"use server";

import { db } from "@/db";
import { usersTable, InsertUser } from "@/db/schema";
import { revalidateTag } from "next/cache";

export async function addUser(user: {
  name: string;
  age: number;
  email: string;
}) {
  try {
    const inserted = await db.insert(usersTable).values(user).returning();
    revalidateTag("users");
    return { success: true, user: inserted[0] };
  } catch (error) {
    return { success: false, error: "Failed to add user" };
  }
}
