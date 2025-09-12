import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MarkAsPaidButton from "./MarkAsPaidButton";

interface TransactionShare {
  id: number;
  transactionDate: string | null;
  transactionDescription: string | null;
  debtorId: number | null;
  debtorName: string | null;
  receiverId: number | null;
  receiverName: string | null;
  toPay: number;
}

interface TransactionSharesTableProps {
  shares: TransactionShare[];
  currentUserId: number | null;
}

export default function TransactionSharesTable({
  shares,
  currentUserId,
}: TransactionSharesTableProps) {
  if (shares.length === 0) {
    return <p>No transaction shares found.</p>;
  }

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
          {shares.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.transactionDate}</TableCell>
              <TableCell>{s.transactionDescription}</TableCell>
              <TableCell>{s.debtorName ?? "Unknown"}</TableCell>
              <TableCell className="text-right">₱ {s.toPay}</TableCell>
              <TableCell className="text-center">
                {s.receiverName ?? "Unknown"}
              </TableCell>
              <TableCell className="text-center">
                {currentUserId === s.receiverId && (
                  <MarkAsPaidButton
                    shareId={s.id}
                    buttonText={
                      currentUserId === s.debtorId ? "You" : undefined
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
