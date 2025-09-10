// app/actions/transactionShareActions.ts
"use server";

import { revalidateTag } from "next/cache";
import { removeTransactionShare } from "@/app/data/transaction/transaction-share-mutations";

// Delete a transaction share
export async function deleteTransactionShare(shareId: number) {
  try {
    await removeTransactionShare(shareId);
    revalidateTag("transactionShares");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction share" };
  }
}
