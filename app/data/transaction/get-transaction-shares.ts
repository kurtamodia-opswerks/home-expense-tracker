import "server-only";

import { db } from "@/db/index";
import { sql, desc, eq } from "drizzle-orm";
import {
  usersTable,
  transactionsTable,
  transactionSharesTable,
} from "@/db/schema";
import { unstable_cache } from "next/cache";

export async function getTransactionShares() {
  const transactionShares = unstable_cache(
    async () =>
      await db
        .select({
          id: transactionSharesTable.id,
          transactionDate: transactionsTable.createdAt,
          transactionDescription: transactionsTable.description,
          debtorId: transactionSharesTable.userId,
          debtorName: usersTable.name, // debtor
          toPay: transactionSharesTable.amount,
          paid: transactionSharesTable.paid,
          receiverId: sql<number>`transactions.payer_id`,
          receiverName: sql<string>`payer.name`,
        })
        .from(transactionSharesTable)
        .leftJoin(
          transactionsTable,
          sql`${transactionSharesTable.transactionId} = ${transactionsTable.id}`
        )
        .leftJoin(
          usersTable,
          sql`${transactionSharesTable.userId} = ${usersTable.id}` // debtor
        )
        .leftJoin(sql`users AS payer`, sql`transactions.payer_id = payer.id`) // receiver
        .orderBy(desc(transactionsTable.createdAt))
        .all(),
    ["transaction_shares"],
    { tags: ["transaction_shares"] }
  );
  return transactionShares();
}

// Get the parent transactionId of a share
export async function getTransactionIdByShare(shareId: number) {
  const [share] = await db
    .select({ transactionId: transactionSharesTable.transactionId })
    .from(transactionSharesTable)
    .where(eq(transactionSharesTable.id, shareId));

  return share?.transactionId ?? null;
}

// Get all shares for a transaction
export async function getSharesByTransaction(transactionId: number) {
  return db
    .select({ paid: transactionSharesTable.paid })
    .from(transactionSharesTable)
    .where(eq(transactionSharesTable.transactionId, transactionId));
}
