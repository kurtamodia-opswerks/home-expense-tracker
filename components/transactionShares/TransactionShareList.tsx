// components/transactionShares/TransactionShareList.tsx
import { db } from "@/db/index";
import { sql } from "drizzle-orm";
import {
  usersTable,
  transactionsTable,
  transactionSharesTable,
} from "@/db/schema";
import { unstable_cache } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fetch shares with joins
const getTransactionShares = unstable_cache(
  async () =>
    await db
      .select({
        id: transactionSharesTable.id,
        transactionDescription: transactionsTable.description,
        userName: usersTable.name,
        toPay: transactionSharesTable.amount,
        paid: transactionSharesTable.paid,
      })
      .from(transactionSharesTable)
      .leftJoin(
        transactionsTable,
        sql`${transactionSharesTable.transactionId} = ${transactionsTable.id}`
      )
      .leftJoin(
        usersTable,
        sql`${transactionSharesTable.userId} = ${usersTable.id}`
      )
      .all(),
  ["transaction_shares"],
  { tags: ["transaction_shares"] }
);

export default async function TransactionSharesList() {
  const shares = await getTransactionShares();

  return (
    <Card className="w-full max-w-3xl mt-6">
      <CardHeader>
        <CardTitle>Transaction Shares</CardTitle>
      </CardHeader>
      <CardContent>
        {shares.length === 0 ? (
          <p>No transaction shares found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Transaction
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    User
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                    To Pay
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                    Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shares.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{s.transactionDescription}</td>
                    <td className="px-4 py-2">{s.userName}</td>
                    <td className="px-4 py-2 text-right">₱ {s.toPay}</td>
                    <td className="px-4 py-2 text-right">{s.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
