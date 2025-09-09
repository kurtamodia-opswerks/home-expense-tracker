import "server-only";

import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { usersTable, transactionsTable, SelectTransaction } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { requireUser } from "../user/require-user";

export async function getTransactions() {
  await requireUser();

  // Cache the query with a tag
  const transactions = unstable_cache(
    async (): Promise<(SelectTransaction & { payerName: string | null })[]> =>
      await db
        .select({
          id: transactionsTable.id,
          description: transactionsTable.description,
          amount: transactionsTable.amount,
          payerId: transactionsTable.payerId,
          createdAt: transactionsTable.createdAt,
          payerName: usersTable.name,
        })
        .from(transactionsTable)
        .leftJoin(usersTable, eq(usersTable.id, transactionsTable.payerId))
        .all(),
    ["transactions"],
    { tags: ["transactions"] }
  );

  return transactions();
}
