"use server";

import {
  assignUserToHomeMutation,
  createHomeMutation,
} from "@/app/data/home/home-mutations";

// Create a new home
export async function createHome(name: string, address: string) {
  const newHome = await createHomeMutation(name, address);
  return newHome;
}

// Assign user to a home
export async function assignUserToHome(userId: number, homeId: number) {
  return await assignUserToHomeMutation(userId, homeId);
}
