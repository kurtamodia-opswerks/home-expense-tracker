"use client";

import { useState } from "react";
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
import type { SelectTransaction, SelectUser } from "@/db/schema";

interface TransactionListClientProps {
  transactions: (SelectTransaction & { payerName: string | null })[];
  currentUser: SelectUser | null;
}

export default function TransactionListClient({
  transactions,
  currentUser,
}: TransactionListClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((tx) => tx.payerId === currentUser?.id);

  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>

        {/* Tabs */}
        <div className="flex gap-2 mt-2">
          <button
            className={`px-3 py-1 rounded ${
              activeTab === "all" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activeTab === "mine" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("mine")}
          >
            My Transactions
          </button>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payer</TableHead>
                  {activeTab === "mine" && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>₱ {tx.amount}</TableCell>
                    <TableCell>{tx.payerName ?? "Unknown"}</TableCell>
                    {activeTab === "mine" && (
                      <TableCell className="text-right">
                        <DeleteTransactionButton transactionId={tx.id} />
                      </TableCell>
                    )}
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
