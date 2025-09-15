import { db } from "@/db";
import { transactionSharesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// Delete a transaction share
export async function removeTransactionShare(shareId: number): Promise<void> {
  await db
    .delete(transactionSharesTable)
    .where(eq(transactionSharesTable.id, shareId));
}

export async function markAsPaidTransactionShare(
  shareId: number
): Promise<void> {
  await db
    .update(transactionSharesTable)
    .set({ paid: true })
    .where(eq(transactionSharesTable.id, shareId));
}
