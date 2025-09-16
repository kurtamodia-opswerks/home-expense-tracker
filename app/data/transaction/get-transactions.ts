import "server-only";

import { db } from "@/db/index";
import { eq, desc } from "drizzle-orm";
import { usersTable, transactionsTable, SelectTransaction } from "@/db/schema";
import { unstable_cache } from "next/cache";

export async function getTransactions() {
  // Cache the query with a tag
  const transactions = unstable_cache(
    async (): Promise<(SelectTransaction & { payerName: string | null })[]> =>
      await db
        .select({
          id: transactionsTable.id,
          description: transactionsTable.description,
          amount: transactionsTable.amount,
          payerId: transactionsTable.payerId,
          homeId: transactionsTable.homeId,
          createdAt: transactionsTable.createdAt,
          payerName: usersTable.name,
          isSettled: transactionsTable.isSettled,
        })
        .from(transactionsTable)
        .leftJoin(usersTable, eq(usersTable.id, transactionsTable.payerId))
        .orderBy(desc(transactionsTable.createdAt))
        .all(),
    ["transactions"],
    { tags: ["transactions"] }
  );

  return transactions();
}
