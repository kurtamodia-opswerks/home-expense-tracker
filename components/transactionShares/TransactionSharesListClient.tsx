// app/components/transactions/TransactionSharesListClient.tsx
"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { SelectUser } from "@/db/schema";
import { deleteTransactionShare } from "@/app/actions/transactionShareActions";

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

interface TransactionSharesListClientProps {
  shares: TransactionShare[];
  currentUser: SelectUser | null;
}

export default function TransactionSharesListClient({
  shares,
  currentUser,
}: TransactionSharesListClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "receiver" | "debtor">(
    "all"
  );
  const [isPending, startTransition] = useTransition();

  const filteredShares = (() => {
    if (activeTab === "all") return shares;
    if (activeTab === "receiver")
      return shares.filter(
        (s) =>
          s.receiverId === currentUser?.id && s.debtorId !== currentUser?.id
      );
    if (activeTab === "debtor")
      return shares.filter(
        (s) =>
          s.debtorId === currentUser?.id && s.receiverId !== currentUser?.id
      );
    return shares;
  })();

  const handleMarkAsPaid = (shareId: number) => {
    if (!confirm("Mark this transaction share as paid?")) return;

    startTransition(async () => {
      const result = await deleteTransactionShare(shareId);
      if (result.success) toast.success("Marked as paid");
      else toast.error(result.error || "Failed to mark as paid");
    });
  };

  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>Transaction Shares</CardTitle>

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
              activeTab === "receiver" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("receiver")}
          >
            As Receiver
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activeTab === "debtor" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("debtor")}
          >
            As Debtor
          </button>
        </div>
      </CardHeader>

      <CardContent>
        {filteredShares.length === 0 ? (
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
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShares.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.transactionDate}</TableCell>
                    <TableCell>{s.transactionDescription}</TableCell>
                    <TableCell>{s.debtorName ?? "Unknown"}</TableCell>
                    <TableCell className="text-right">₱ {s.toPay}</TableCell>
                    <TableCell className="text-center">
                      {s.receiverName ?? "Unknown"}
                    </TableCell>
                    <TableCell className="text-center">
                      {currentUser?.id === s.receiverId && (
                        <Button
                          onClick={() => handleMarkAsPaid(s.id)}
                          disabled={isPending}
                          variant="outline"
                          size="sm"
                        >
                          {isPending ? "Processing..." : "Mark as Paid"}
                        </Button>
                      )}
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
