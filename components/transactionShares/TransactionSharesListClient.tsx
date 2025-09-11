// app/components/transactions/TransactionSharesListClient.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SelectUser } from "@/db/schema";
import TransactionSharesTabs from "./TransactionSharesTabs";
import TransactionSharesTable from "./TransactionSharesTable";

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

  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>Transaction Shares</CardTitle>
        <TransactionSharesTabs activeTab={activeTab} onChange={setActiveTab} />
      </CardHeader>

      <CardContent>
        <TransactionSharesTable
          shares={filteredShares}
          currentUserId={currentUser?.id ?? null}
        />
      </CardContent>
    </Card>
  );
}
