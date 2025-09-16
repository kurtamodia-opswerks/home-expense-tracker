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
import MarkAsPaidButton from "./MarkAsPaidButton";
import { DollarSign } from "lucide-react";
import DeleteShareButton from "./DeleteShareButton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TransactionShare {
  id: number;
  transactionDate: string | null;
  transactionDescription: string | null;
  debtorId: number | null;
  debtorName: string | null;
  receiverId: number | null;
  receiverName: string | null;
  toPay: number;
  paid: boolean;
}

interface TransactionSharesTableProps {
  shares: TransactionShare[];
  currentUserId: number | null;
  itemsPerPage?: number;
  activeTab: "all" | "receiver" | "debtor";
}

export default function TransactionSharesTable({
  shares,
  currentUserId,
  itemsPerPage = 10,
  activeTab,
}: TransactionSharesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShares = shares.slice(startIndex, startIndex + itemsPerPage);

  const showActionsColumn = activeTab !== "debtor" && activeTab !== "all";

  if (shares.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <DollarSign className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">
          No transaction shares found
        </h3>
        <p className="text-muted-foreground">
          {currentPage > 1
            ? "Try going back to the first page"
            : "When you have transaction shares, they'll appear here"}
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
              <TableHead>Debtor</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              {showActionsColumn && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedShares.map((s) => (
              <TableRow key={s.id} className={s.paid ? "opacity-70" : ""}>
                <TableCell className="whitespace-nowrap">
                  {s.transactionDate
                    ? format(new Date(s.transactionDate), "MMM dd, yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {s.transactionDescription || "No description"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {s.debtorName || "Unknown"}
                    {currentUserId === s.debtorId && (
                      <Badge variant="outline" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {s.receiverName || "Unknown"}
                    {currentUserId === s.receiverId && (
                      <Badge variant="outline" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ₱ {s.toPay.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {s.paid ? (
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-700 border-green-200"
                    >
                      Paid
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-amber-500/10 text-amber-700 border-amber-200"
                    >
                      Pending
                    </Badge>
                  )}
                </TableCell>
                {showActionsColumn && (
                  <TableCell>
                    <div className="flex gap-2 items-center justify-center">
                      <DeleteShareButton
                        shareId={s.id}
                        variant="ghost"
                        size="icon"
                      />
                      {!s.paid && (
                        <MarkAsPaidButton
                          shareId={s.id}
                          isDebtor={currentUserId === s.debtorId}
                          variant="ghost"
                          size="icon"
                        />
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {shares.length > itemsPerPage && (
        <PaginationControls
          totalItems={shares.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
