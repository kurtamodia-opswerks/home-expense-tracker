import { getTransactionShares } from "@/app/data/transaction/get-transaction-shares";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TransactionSharesList() {
  const shares = await getTransactionShares();

  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>Transaction Shares</CardTitle>
      </CardHeader>
      <CardContent>
        {shares.length === 0 ? (
          <p>No transaction shares found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Debtor</TableHead>
                  <TableHead className="text-right">To Pay</TableHead>
                  <TableHead className="text-center">Receiver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shares.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.transactionDate}</TableCell>
                    <TableCell>{s.transactionDescription}</TableCell>
                    <TableCell>{s.debtorName}</TableCell>
                    <TableCell className="text-right">₱ {s.toPay}</TableCell>
                    <TableCell className="text-center">
                      {s.receiverName}
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
