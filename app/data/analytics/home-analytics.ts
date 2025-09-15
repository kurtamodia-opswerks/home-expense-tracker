// app/data/analytics/home-analytics.ts
import "server-only";

import { db } from "@/db";
import { sql, eq } from "drizzle-orm";
import { transactionsTable, usersTable } from "@/db/schema";
import { unstable_cache } from "next/cache";

export async function getHomeAnalyticsQuery(homeId: number) {
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

      // Most frequent purchase description
      const [mostFrequentPurchase] = await db
        .select({
          description: sql<string>`LOWER(${transactionsTable.description})`,
          count: sql<number>`COUNT(${transactionsTable.id})`,
        })
        .from(transactionsTable)
        .where(eq(transactionsTable.homeId, homeId))
        .groupBy(transactionsTable.description)
        .orderBy(sql`COUNT(${transactionsTable.id}) DESC`)
        .limit(1);

      // Highest expense category
      const [highestExpenseCategory] = await db
        .select({
          description: sql<string>`LOWER(${transactionsTable.description})`,
          total: sql<number>`SUM(${transactionsTable.amount})`,
        })
        .from(transactionsTable)
        .where(eq(transactionsTable.homeId, homeId))
        .groupBy(transactionsTable.description)
        .orderBy(sql`SUM(${transactionsTable.amount}) DESC`)
        .limit(1);

      const [biggestTransaction] = await db
        .select({
          id: transactionsTable.id,
          description: sql<string>`LOWER(${transactionsTable.description})`,
          amount: transactionsTable.amount,
        })
        .from(transactionsTable)
        .where(eq(transactionsTable.homeId, homeId))
        .orderBy(sql`${transactionsTable.amount} DESC`)
        .limit(1);

      return {
        totalExpenses,
        monthlyExpenses,
        topSpenders,
        mostFrequentPurchase,
        highestExpenseCategory,
        biggestTransaction,
      };
    },
    ["home-analytics", homeId.toString()],
    { tags: ["home-analytics"] }
  );

  return homeAnalytics();
}
