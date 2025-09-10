// app/actions/userActions.ts
"use server";

import { revalidateTag } from "next/cache";
import { insertUser, removeUser } from "@/app/data/user/user-mutations";
import { InsertUser, SelectUser } from "@/db/schema";

export async function addUser(user: InsertUser) {
  try {
    const inserted: SelectUser[] = await insertUser(user);
    revalidateTag("users");
    return { success: true, user: inserted[0] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add user" };
  }
}

export async function deleteUser(userId: number) {
  try {
    await removeUser(userId);
    revalidateTag("users");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete user" };
  }
}
