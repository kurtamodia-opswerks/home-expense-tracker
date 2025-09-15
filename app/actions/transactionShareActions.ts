"use server";

import {
  markAsPaidTransactionShare,
  removeTransactionShare,
} from "@/app/data/transaction/transaction-share-mutations";
import { revalidateData } from "./revalidate";

// Delete a transaction share
export async function deleteTransactionShare(shareId: number) {
  try {
    await removeTransactionShare(shareId);
    await revalidateData();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction share" };
  }
}

export async function markPaidTransactionShare(shareId: number) {
  try {
    await markAsPaidTransactionShare(shareId);
    await revalidateData();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to mark as paid" };
  }
}
