// app/db/actions.ts
"use server";

import {
  assignUserToHomeMutation,
  leaveHomeMutation,
} from "@/app/data/home/home-mutations";
import { revalidatePath } from "next/cache";

// Assign user to a home
export async function joinHome(userId: number, homeId: number) {
  await assignUserToHomeMutation(userId, homeId);

  // Ensure UI updates after joining
  revalidatePath("/homes");
}

// Leave home (set homeId back to null)
export async function leaveHome(userId: number) {
  await leaveHomeMutation(userId);
  revalidatePath("/homes");
}
