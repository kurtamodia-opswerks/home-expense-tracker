// data/transaction-share-mutations.ts
import { db } from "@/db";
import { transactionSharesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// Delete a transaction share
export async function removeTransactionShare(shareId: number): Promise<void> {
  await db
    .delete(transactionSharesTable)
    .where(eq(transactionSharesTable.id, shareId));
}
