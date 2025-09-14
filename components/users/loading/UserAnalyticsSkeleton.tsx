"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserAnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-32 mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Owed vs Receivable</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <Skeleton className="h-60 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
