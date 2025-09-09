// app/actions/transactionActions.ts
"use server";

import { db } from "@/db";
import {
  transactionsTable,
  InsertTransaction,
  SelectTransaction,
} from "@/db/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

// Add a new transaction
export async function addTransaction(transaction: InsertTransaction) {
  try {
    const inserted: SelectTransaction[] = await db
      .insert(transactionsTable)
      .values(transaction)
      .returning();

    // Invalidate cache tagged for transactions
    revalidateTag("transactions");

    return { success: true, transaction: inserted[0] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add transaction" };
  }
}

// Delete a transaction
export async function deleteTransaction(transactionId: number) {
  try {
    await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.id, transactionId));

    // Invalidate cache tagged for transactions
    revalidateTag("transactions");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction" };
  }
}
