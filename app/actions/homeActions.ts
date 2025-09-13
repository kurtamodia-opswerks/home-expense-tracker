"use server";

import {
  assignUserToHomeMutation,
  leaveHomeMutation,
} from "@/app/data/home/home-mutations";
import { revalidateData } from "./revalidate";

// Assign user to a home
export async function joinHome(userId: number, homeId: number) {
  await assignUserToHomeMutation(userId, homeId);

  // Ensure UI updates after joining
  await revalidateData();
}

// Leave home (set homeId back to null)
export async function leaveHome(userId: number) {
  await leaveHomeMutation(userId);
  await revalidateData();
}
