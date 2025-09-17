"use server";

import {
  assignUserToHomeMutation,
  createHomeMutation,
} from "@/app/data/home/home-mutations";
import { revalidateData } from "./revalidate";

// Create a new home
export async function createHome(name: string, address: string) {
  const newHome = await createHomeMutation(name, address);
  await revalidateData();
  return newHome;
}

// Assign user to a home
export async function assignUserToHome(userId: number, homeId: number) {
  await revalidateData();
  return await assignUserToHomeMutation(userId, homeId);
}
