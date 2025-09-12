import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionSharesTableSkeleton from "./TransactionSharesTableSkeleton";

export default function TransactionSharesSkeleton() {
  return (
    <Card className="w-full max-w-4xl mt-6">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <TransactionSharesTableSkeleton />
      </CardContent>
    </Card>
  );
}
