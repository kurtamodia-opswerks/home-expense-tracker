// app/data/analytics/home-analytics.ts
import "server-only";

import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { transactionsTable, usersTable } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { requireUser } from "../user/require-user";

export async function getHomeAnalyticsQuery(homeId: number) {
  await requireUser();

  const homeAnalytics = unstable_cache(
    async () => {
      // Total expenses
      const [{ totalExpenses }] = await db
        .select({
          totalExpenses: sql<number>`COALESCE(SUM(${transactionsTable.amount}), 0)`,
        })
        .from(transactionsTable)
        .where(eq(transactionsTable.homeId, homeId));

      // Expenses per month
      const monthlyExpenses = await db
        .select({
          month: sql<string>`strftime('%Y-%m', ${transactionsTable.createdAt})`,
          total: sql<number>`SUM(${transactionsTable.amount})`,
        })
        .from(transactionsTable)
        .where(eq(transactionsTable.homeId, homeId))
        .groupBy(sql`strftime('%Y-%m', ${transactionsTable.createdAt})`);

      // Top spenders
      const topSpenders = await db
        .select({
          userId: transactionsTable.payerId,
          name: usersTable.name,
          total: sql<number>`SUM(${transactionsTable.amount})`.as("total"),
        })
        .from(transactionsTable)
        .innerJoin(usersTable, eq(usersTable.id, transactionsTable.payerId))
        .where(eq(transactionsTable.homeId, homeId))
        .groupBy(transactionsTable.payerId, usersTable.name)
        .orderBy(sql`total DESC`);

      return { totalExpenses, monthlyExpenses, topSpenders };
    },
    ["home-analytics", homeId.toString()],
    { tags: ["home-analytics"] }
  );

  return homeAnalytics();
}
