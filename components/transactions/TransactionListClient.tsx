"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SelectTransaction, SelectUser } from "@/db/schema";
import TransactionListTabs from "./TransactionListTabs";
import TransactionListTable from "./TransactionListTable";
import { Button } from "@/components/ui/button";
import { Filter, Download, DollarSign, TrendingUp, Users } from "lucide-react";
import { exportTransactionsToPdf } from "@/lib/exportToPdf";

interface TransactionListClientProps {
  transactions: (SelectTransaction & { payerName: string | null })[];
  currentUser: SelectUser | null;
}

export default function TransactionListClient({
  transactions,
  currentUser,
}: TransactionListClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [filterDate, setFilterDate] = useState<"all" | "week" | "month">("all");

  const filteredTransactions = (() => {
    let result = transactions;

    // Filter by tab
    if (activeTab === "mine") {
      result = result.filter((tx) => tx.payerId === currentUser?.id);
    } else {
      result = result.filter((tx) => tx.homeId === currentUser?.homeId);
    }

    // Filter by date
    const now = new Date();
    if (filterDate === "week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter((tx) => new Date(tx.createdAt) >= oneWeekAgo);
    } else if (filterDate === "month") {
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      result = result.filter((tx) => new Date(tx.createdAt) >= oneMonthAgo);
    }

    return result;
  })();

  // Calculate summary stats
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount),
    0
  );
  const yourTransactions = filteredTransactions.filter(
    (tx) => tx.payerId === currentUser?.id
  );
  const yourTotal = yourTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount),
    0
  );

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold">
                  {filteredTransactions.length}
                </p>
              </div>
              <div className="p-2 rounded-full bg-primary/10">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </p>
                <p className="text-2xl font-bold">₱ {totalAmount.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-full bg-blue-500/10">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Your Contributions
                </p>
                <p className="text-2xl font-bold">₱ {yourTotal.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-full bg-green-500/10">
                <Users className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Transaction History</CardTitle>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-[140px] justify-between"
                    >
                      {filterDate === "all"
                        ? "All Time"
                        : filterDate === "week"
                        ? "This Week"
                        : "This Month"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setFilterDate("all")}>
                      All Time
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterDate("week")}>
                      This Week
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterDate("month")}>
                      This Month
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => exportTransactionsToPdf(filteredTransactions)}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TransactionListTabs activeTab={activeTab} onChange={setActiveTab} />
        </CardHeader>

        <CardContent>
          <TransactionListTable
            transactions={filteredTransactions}
            showActions={activeTab === "mine"}
            currentUser={currentUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
