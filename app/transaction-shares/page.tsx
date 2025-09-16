import TransactionShareList from "@/components/transactionShares/TransactionShareList";
import { Suspense } from "react";
import TransactionSharesSkeleton from "@/components/transactionShares/loading/TransactionSharesSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, CheckCircle } from "lucide-react";

export default async function TransactionShares() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Transaction Shares
        </h1>
        <p className="text-muted-foreground">
          Manage and track all your shared expenses in one place
        </p>
      </div>

      {/* Main Content */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Transaction Shares</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-9 pr-4 py-2 border rounded-md text-sm w-full sm:w-64"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="p-2 border rounded-md hover:bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Suspense fallback={<TransactionSharesSkeleton />}>
            <TransactionShareList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
