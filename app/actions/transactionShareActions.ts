"use server";

import {
  removeTransactionShare,
  updateShareAsPaid,
} from "@/app/data/transaction/transaction-share-mutations";
import { revalidateData } from "./revalidate";
import {
  getSharesByTransaction,
  getTransactionIdByShare,
} from "../data/transaction/get-transaction-shares";
import { updateTransactionSettled } from "../data/transaction/transaction-mutations";

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
    // 1. Mark the share as paid
    await updateShareAsPaid(shareId);

    // 2. Get parent transaction
    const transactionId = await getTransactionIdByShare(shareId);
    if (!transactionId) {
      throw new Error("Transaction not found for share");
    }

    // 3. Check if all shares are paid
    const shares = await getSharesByTransaction(transactionId);
    const allPaid = shares.every((s) => s.paid === true);

    // 4. Update transaction status
    await updateTransactionSettled(transactionId, allPaid);

    // 5. Revalidate cache / paths
    await revalidateData();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to mark as paid" };
  }
}
