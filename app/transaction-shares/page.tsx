import TransactionShareList from "@/components/transactionShares/TransactionShareList";
import { Suspense } from "react";
import TransactionSharesSkeleton from "@/components/transactionShares/loading/TransactionSharesSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
