// app/db/actions.ts
"use server";

import { assignUserToHomeMutation } from "@/app/data/home/home-mutations";
import { revalidatePath } from "next/cache";

// Assign user to a home
export async function joinHome(userId: number, homeId: number) {
  await assignUserToHomeMutation(userId, homeId);

  // Ensure UI updates after joining
  revalidatePath("/homes");
}
