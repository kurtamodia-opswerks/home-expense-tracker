// app/actions/userActions.ts
"use server";

import { insertUser, removeUser } from "@/app/data/user/user-mutations";
import { InsertUser, SelectUser } from "@/db/schema";
import { revalidateData } from "./revalidate";

export async function addUser(user: InsertUser) {
  try {
    const inserted: SelectUser[] = await insertUser(user);
    await revalidateData();
    return { success: true, user: inserted[0] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add user" };
  }
}

export async function deleteUser(userId: number) {
  try {
    await removeUser(userId);
    await revalidateData();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete user" };
  }
}
