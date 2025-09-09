import { SelectTransaction, SelectUser } from "@/db/schema";
import DeleteTransactionButton from "./DeleteTransactionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactions } from "@/app/data/transaction/get-transactions";

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
