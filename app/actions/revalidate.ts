"use server";

import { revalidateTag } from "next/cache";

export async function revalidateData() {
  revalidateTag("homes");
  revalidateTag("users");
  revalidateTag("transactions");
  revalidateTag("transaction_shares");
  return true;
}
