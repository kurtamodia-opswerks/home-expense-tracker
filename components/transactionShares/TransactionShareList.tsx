import { db } from "@/db/index";
import { sql } from "drizzle-orm";
import {
  usersTable,
  transactionsTable,
  transactionSharesTable,
} from "@/db/schema";
import { unstable_cache } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getTransactionShares = unstable_cache(
  async () =>
    await db
      .select({
        id: transactionSharesTable.id,
        transactionDescription: transactionsTable.description,
        userName: usersTable.name,
        toPay: transactionSharesTable.amount,
        paid: transactionSharesTable.paid,
        payerId: transactionsTable.payerId,
      })
      .from(transactionSharesTable)
      .leftJoin(
        transactionsTable,
        sql`${transactionSharesTable.transactionId} = ${transactionsTable.id}`
      )
      .leftJoin(
        usersTable,
        sql`${transactionSharesTable.userId} = ${usersTable.id}`
      )
      .all(),
  ["transaction_shares"],
  { tags: ["transaction_shares"] }
);

export default async function TransactionSharesList() {
  const shares = await getTransactionShares();

  return (
    <Card className="w-full max-w-3xl mt-6">
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
                  <TableHead>Transaction</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">To Pay</TableHead>
                  <TableHead className="text-center">Receiver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shares.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.transactionDescription}</TableCell>
                    <TableCell>{s.userName}</TableCell>
                    <TableCell className="text-right">₱ {s.toPay}</TableCell>
                    <TableCell className="text-center">{s.payerId}</TableCell>
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
