import { SelectTransaction } from "@/db/schema";
import DeleteTransactionButton from "./DeleteTransactionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransactions } from "@/app/data/transaction/get-transactions";

export default async function TransactionList() {
  const transactions: (SelectTransaction & { payerName: string | null })[] =
    await getTransactions();

  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payer</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>₱ {tx.amount}</TableCell>
                    <TableCell>{tx.payerName ?? "Unknown"}</TableCell>
                    <TableCell className="text-right">
                      <DeleteTransactionButton transactionId={tx.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
