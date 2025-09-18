"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SelectUser } from "@/db/schema";
import TransactionSharesTabs from "./TransactionSharesTabs";
import TransactionSharesTable from "./TransactionSharesTable";
import {
  Filter,
  Download,
  TrendingUp,
  Users,
  PhilippinePeso,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportSharesToPdf } from "@/lib/exportToPdf";

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

interface TransactionSharesListClientProps {
  shares: TransactionShare[];
  currentUser: SelectUser | null;
}

export default function TransactionSharesListClient({
  shares,
  currentUser,
}: TransactionSharesListClientProps) {
  const itemsPerPage = 10;
  const [activeTab, setActiveTab] = useState<"all" | "receiver" | "debtor">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "unpaid">(
    "all"
  );

  const filteredShares = (() => {
    let result = shares;

    // Filter by tab
    if (activeTab === "receiver") {
      result = result.filter(
        (s) =>
          s.receiverId === currentUser?.id && s.debtorId !== currentUser?.id
      );
    } else if (activeTab === "debtor") {
      result = result.filter(
        (s) =>
          s.debtorId === currentUser?.id && s.receiverId !== currentUser?.id
      );
    } else {
      result = result.filter(
        (s) =>
          s.receiverId === currentUser?.id || s.debtorId === currentUser?.id
      );
    }

    // Filter by status
    if (filterStatus === "paid") {
      result = result.filter((s) => s.paid);
    } else if (filterStatus === "unpaid") {
      result = result.filter((s) => !s.paid);
    }

    return result;
  })();

  // Calculate summary stats
  const totalOwed = filteredShares
    .filter((s) => s.debtorId === currentUser?.id && !s.paid)
    .reduce((sum, s) => sum + s.toPay, 0);

  const totalToReceive = filteredShares
    .filter((s) => s.receiverId === currentUser?.id && !s.paid)
    .reduce((sum, s) => sum + s.toPay, 0);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Shares
                </p>
                <p className="text-2xl font-bold">{filteredShares.length}</p>
              </div>
              <div className="p-2 rounded-full bg-primary/10">
                <PhilippinePeso className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  You Owe
                </p>
                <p className="text-2xl font-bold">₱ {totalOwed.toFixed(2)}</p>
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
                  {"You're Owed"}
                </p>
                <p className="text-2xl font-bold">
                  ₱ {totalToReceive.toFixed(2)}
                </p>
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
            <CardTitle>Transaction Shares</CardTitle>

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
                      {filterStatus === "all"
                        ? "All Status"
                        : filterStatus === "paid"
                        ? "Paid Only"
                        : "Unpaid Only"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("unpaid")}>
                      Unpaid Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("paid")}>
                      Paid Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => exportSharesToPdf(filteredShares)}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TransactionSharesTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </CardHeader>

        <CardContent>
          <TransactionSharesTable
            shares={filteredShares}
            currentUserId={currentUser?.id ?? null}
            itemsPerPage={itemsPerPage}
            activeTab={activeTab}
          />
        </CardContent>
      </Card>
    </div>
  );
}
