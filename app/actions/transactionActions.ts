// app/actions/transactionActions.ts
"use server";

import { db } from "@/db";
import {
  transactionsTable,
  transactionSharesTable,
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

export async function addTransactionWithShares(data: {
  description: string;
  amount: number;
  payerId: number;
  userIds: number[]; // users involved
}) {
  try {
    // Insert the transaction
    const insertedTx = await db
      .insert(transactionsTable)
      .values({
        description: data.description,
        amount: data.amount,
        payerId: data.payerId,
      })
      .returning();

    const transactionId = insertedTx[0].id;

    // Calculate equal share per user
    const shareAmount = Math.floor(data.amount / data.userIds.length);

    // Insert transaction shares
    await Promise.all(
      data.userIds.map((userId) =>
        db.insert(transactionSharesTable).values({
          transactionId,
          userId,
          amount: shareAmount,
          paid: 0,
        })
      )
    );

    revalidateTag("transactions");
    revalidateTag("transaction_shares");

    return { success: true, transaction: insertedTx[0] };
  } catch (error) {
    return { success: false, error: "Failed to add transaction with shares" };
  }
}
