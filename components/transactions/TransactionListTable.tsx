"use client";

import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteTransactionButton from "./DeleteTransactionButton";
import type { SelectTransaction } from "@/db/schema";

interface TransactionListTableProps {
  transactions: (SelectTransaction & { payerName: string | null })[];
  showActions?: boolean;
  itemsPerPage?: number;
}

export default function TransactionListTable({
  transactions,
  showActions = false,
  itemsPerPage = 5,
}: TransactionListTableProps) {
  if (transactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  // client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Home</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payer</TableHead>
            {showActions && (
              <TableHead className="text-center">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.createdAt}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell>{tx.homeId ?? "Unknown"}</TableCell>
              <TableCell>₱ {tx.amount}</TableCell>
              <TableCell>{tx.payerName ?? "Unknown"}</TableCell>
              {showActions && (
                <TableCell className="flex justify-center">
                  <DeleteTransactionButton transactionId={tx.id} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControls
        totalItems={transactions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
