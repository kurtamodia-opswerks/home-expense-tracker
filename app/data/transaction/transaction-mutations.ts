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
  homeId: number;
  userIds: number[];
  customShares?: { userId: number; amount: number }[];
}) {
  const insertedTx = await db
    .insert(transactionsTable)
    .values({
      description: data.description,
      amount: data.amount,
      payerId: data.payerId,
      homeId: data.homeId,
    })
    .returning();

  const transactionId = insertedTx[0].id;

  if (data.customShares && data.customShares.length > 0) {
    await Promise.all(
      data.customShares.map((share) =>
        db.insert(transactionSharesTable).values({
          transactionId,
          userId: share.userId,
          amount: share.amount,
          paid: share.userId === data.payerId ? true : false,
        })
      )
    );
  } else {
    // ✅ Default equal split
    const shareAmount = Math.floor(data.amount / data.userIds.length);

    await Promise.all(
      data.userIds.map((userId) =>
        db.insert(transactionSharesTable).values({
          transactionId,
          userId,
          amount: shareAmount,
          paid: userId === data.payerId ? true : false,
        })
      )
    );
  }

  return insertedTx;
}
