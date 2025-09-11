"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SelectTransaction, SelectUser } from "@/db/schema";
import TransactionListTabs from "./TransactionListTabs";
import TransactionListTable from "./TransactionListTable";

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
        <TransactionListTabs activeTab={activeTab} onChange={setActiveTab} />
      </CardHeader>

      <CardContent>
        <TransactionListTable
          transactions={filteredTransactions}
          showActions={activeTab === "mine"}
        />
      </CardContent>
    </Card>
  );
}
