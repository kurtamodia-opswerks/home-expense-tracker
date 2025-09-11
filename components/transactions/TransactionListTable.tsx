// app/components/transactions/TransactionListTable.tsx

import DeleteTransactionButton from "./DeleteTransactionButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SelectTransaction } from "@/db/schema";

interface TransactionListTableProps {
  transactions: (SelectTransaction & { payerName: string | null })[];
  showActions?: boolean;
}

export default function TransactionListTable({
  transactions,
  showActions = false,
}: TransactionListTableProps) {
  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Home</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payer</TableHead>
            {showActions && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.description}</TableCell>
              <TableCell>{tx.homeId ?? "Unknown"}</TableCell>
              <TableCell>₱ {tx.amount}</TableCell>
              <TableCell>{tx.payerName ?? "Unknown"}</TableCell>
              {showActions && (
                <TableCell className="text-right">
                  <DeleteTransactionButton transactionId={tx.id} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
