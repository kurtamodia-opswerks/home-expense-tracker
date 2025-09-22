// app/actions/createHomeAction.ts
"use server";

import { createHome, assignUserToHome } from "@/app/actions/userActions";
import { revalidateData } from "@/app/actions/revalidate"; // optional if you want cache refresh

export async function createHomeAction({
  name,
  address,
  userId,
}: {
  name: string;
  address: string;
  userId: number;
}) {
  if (!name || !address || !userId) {
    throw new Error("Missing fields");
  }

  const home = await createHome(name, address);
  await assignUserToHome(userId, home.id);

  return home;
}
