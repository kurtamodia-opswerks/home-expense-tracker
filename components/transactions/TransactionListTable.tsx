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
import type { SelectTransaction, SelectUser } from "@/db/schema";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Home, User } from "lucide-react";

interface TransactionListTableProps {
  transactions: (SelectTransaction & { payerName: string | null })[];
  showActions?: boolean;
  itemsPerPage?: number;
  currentUser: SelectUser | null;
}

export default function TransactionListTable({
  transactions,
  showActions = false,
  itemsPerPage = 10,
  currentUser,
}: TransactionListTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <DollarSign className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No transactions found</h3>
        <p className="text-muted-foreground">
          {currentPage > 1
            ? "Try going back to the first page"
            : "When you have transactions, they'll appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Home</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Payer</TableHead>
              {showActions && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(tx.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="flex items-center gap-2">
                    {tx.description || "No description"}
                    {tx.payerId === currentUser?.id && (
                      <Badge variant="outline" className="text-xs">
                        Yours
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    {tx.homeId || "Unknown"}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ₱ {Number(tx.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {tx.payerName || "Unknown"}
                  </div>
                </TableCell>
                {showActions && (
                  <TableCell>
                    <div className="flex justify-center">
                      <DeleteTransactionButton transactionId={tx.id} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {transactions.length > itemsPerPage && (
        <PaginationControls
          totalItems={transactions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
