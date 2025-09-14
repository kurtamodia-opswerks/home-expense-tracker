import "server-only";

import { db } from "@/db";
import { sql, eq, and, ne } from "drizzle-orm";
import { transactionsTable, transactionSharesTable } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { requireUser } from "../user/require-user";

export async function getUserAnalyticsQuery(userId: number, homeId?: number) {
  await requireUser();

  const userAnalytics = unstable_cache(
    async () => {
      // Total paid by user (as payer)
      const [{ totalPaid }] = await db
        .select({
          totalPaid: sql<number>`COALESCE(SUM(${transactionsTable.amount}), 0)`,
        })
        .from(transactionsTable)
        .where(
          homeId
            ? and(
                eq(transactionsTable.payerId, userId),
                eq(transactionsTable.homeId, homeId)
              )
            : eq(transactionsTable.payerId, userId)
        );

      // Total owed (user as debtor, exclude self-payer)
      const [{ totalOwed }] = await db
        .select({
          totalOwed: sql<number>`COALESCE(SUM(${transactionSharesTable.amount}), 0)`,
        })
        .from(transactionSharesTable)
        .innerJoin(
          transactionsTable,
          eq(transactionSharesTable.transactionId, transactionsTable.id)
        )
        .where(
          and(
            eq(transactionSharesTable.userId, userId), // user is debtor
            ne(transactionsTable.payerId, userId), // exclude self-debts
            homeId ? eq(transactionsTable.homeId, homeId) : sql`1=1`
          )
        );

      // Total receivable (others owe to this user as payer)
      const [{ totalReceivable }] = await db
        .select({
          totalReceivable: sql<number>`COALESCE(SUM(${transactionSharesTable.amount}), 0)`,
        })
        .from(transactionSharesTable)
        .innerJoin(
          transactionsTable,
          eq(transactionSharesTable.transactionId, transactionsTable.id)
        )
        .where(
          and(
            eq(transactionsTable.payerId, userId), // user is receiver
            ne(transactionSharesTable.userId, userId), // exclude self
            homeId ? eq(transactionsTable.homeId, homeId) : sql`1=1`
          )
        );

      // Monthly breakdown (what user paid as payer)
      const monthly = await db
        .select({
          month: sql<string>`strftime('%Y-%m', ${transactionsTable.createdAt})`,
          paid: sql<number>`SUM(CASE WHEN ${transactionsTable.payerId} = ${userId} THEN ${transactionsTable.amount} ELSE 0 END)`,
        })
        .from(transactionsTable)
        .where(homeId ? eq(transactionsTable.homeId, homeId) : sql`1=1`)
        .groupBy(sql`strftime('%Y-%m', ${transactionsTable.createdAt})`);

      return {
        totalPaid,
        totalOwed,
        totalReceivable,
        monthly,
      };
    },
    ["user-analytics", userId.toString(), homeId?.toString() ?? "all"],
    { tags: ["user-analytics"] }
  );

  return userAnalytics();
}
