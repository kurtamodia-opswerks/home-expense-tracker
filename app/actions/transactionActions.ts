// app/actions/transactionActions.ts
"use server";

import { InsertTransaction, SelectTransaction } from "@/db/schema";
import {
  insertTransaction,
  removeTransaction,
  insertTransactionWithShares,
} from "@/app/data/transaction/transaction-mutations";
import { revalidateData } from "./revalidate";

// Add a new transaction
export async function addTransaction(transaction: InsertTransaction) {
  try {
    const inserted: SelectTransaction[] = await insertTransaction(transaction);
    await revalidateData();
    return { success: true, transaction: inserted[0] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add transaction" };
  }
}

// Delete a transaction
// Delete a transaction
export async function deleteTransaction(transactionId: number) {
  try {
    await removeTransaction(transactionId);
    await revalidateData();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction" };
  }
}

// Add transaction with shares
export async function addTransactionWithShares(data: {
  description: string;
  amount: number;
  payerId: number;
  userIds: number[];
}) {
  try {
    const insertedTx = await insertTransactionWithShares(data);
    await revalidateData();
    return { success: true, transaction: insertedTx[0] };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add transaction with shares" };
  }
}
