import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { usersTable, transactionsTable, SelectTransaction } from "@/db/schema";
import { unstable_cache } from "next/cache";
import DeleteTransactionButton from "./DeleteTransactionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Cache the query with a tag
const getTransactions = unstable_cache(
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

export default async function TransactionList() {
  const transactions: (SelectTransaction & { payerName: string | null })[] =
    await getTransactions();

  return (
    <Card className="w-full max-w-md mt-6">
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="border p-2 rounded-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{tx.description}</strong> - ₱ {tx.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payer ID: {tx.payerId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payer Name: {tx.payerName ?? "Unknown"}
                  </p>
                </div>
                <DeleteTransactionButton transactionId={tx.id} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
