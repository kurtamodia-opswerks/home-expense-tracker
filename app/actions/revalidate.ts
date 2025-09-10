// app/actions/revalidate.ts
"use server";

import { revalidateTag } from "next/cache";

export async function revalidateData() {
  revalidateTag("users");
  revalidateTag("transactions");
  revalidateTag("transaction_shares");
  return true;
}
