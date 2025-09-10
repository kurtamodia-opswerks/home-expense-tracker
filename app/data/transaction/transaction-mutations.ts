// data/transaction-mutations.ts
import { db } from "@/db";
import {
  transactionsTable,
  transactionSharesTable,
  InsertTransaction,
  SelectTransaction,
} from "@/db/schema";
import { eq } from "drizzle-orm";

// Insert a transaction
export async function insertTransaction(
  transaction: InsertTransaction
): Promise<SelectTransaction[]> {
  return db.insert(transactionsTable).values(transaction).returning();
}

// Delete a transaction
export async function removeTransaction(transactionId: number): Promise<void> {
  await db
    .delete(transactionsTable)
    .where(eq(transactionsTable.id, transactionId));
}

// Insert transaction with shares
export async function insertTransactionWithShares(data: {
  description: string;
  amount: number;
  payerId: number;
  userIds: number[];
}) {
  const insertedTx = await db
    .insert(transactionsTable)
    .values({
      description: data.description,
      amount: data.amount,
      payerId: data.payerId,
    })
    .returning();

  const transactionId = insertedTx[0].id;
  const shareAmount = Math.floor(data.amount / data.userIds.length);

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

  return insertedTx;
}
