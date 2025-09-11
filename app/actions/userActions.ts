// app/db/actions.ts
"use server";

import {
  assignUserToHomeMutation,
  createHomeMutation,
} from "@/app/data/home/home-mutations";

// --------------------
// Homes
// --------------------
export async function createHome(name: string, address: string) {
  const newHome = await createHomeMutation(name, address);
  return newHome;
}

// --------------------
// Users to Homes
// --------------------
export async function assignUserToHome(userId: number, homeId: number) {
  return await assignUserToHomeMutation(userId, homeId);
}
