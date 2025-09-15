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
import { CircleCheck, UserRoundCheck } from "lucide-react";
import DeleteShareButton from "./DeleteShareButton";

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
}

export default function TransactionSharesTable({
  shares,
  currentUserId,
  itemsPerPage = 5,
}: TransactionSharesTableProps) {
  if (shares.length === 0) {
    return <p>No transaction shares found.</p>;
  }

  // client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShares = shares.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Transaction</TableHead>
            <TableHead>Debtor</TableHead>
            <TableHead className="text-right">To Pay</TableHead>
            <TableHead className="text-center">Receiver</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedShares.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.transactionDate}</TableCell>
              <TableCell>{s.transactionDescription}</TableCell>
              <TableCell>{s.debtorName ?? "Unknown"}</TableCell>
              <TableCell className="text-right">₱ {s.toPay}</TableCell>
              <TableCell className="text-center">
                {s.receiverName ?? "Unknown"}
              </TableCell>
              <TableCell className="flex gap-2 items-center justify-center">
                <DeleteShareButton shareId={s.id} />
                {!s.paid ? (
                  <MarkAsPaidButton
                    shareId={s.id}
                    buttonText={currentUserId === s.debtorId ? true : false}
                  />
                ) : (
                  <CircleCheck className="text-green-500 h-5 w-5 mr-4" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControls
        totalItems={shares.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
