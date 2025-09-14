// components/analytics/loading/HomeAnalyticsSkeleton.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeAnalyticsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 w-full">
      {/* Summary Metrics Skeleton */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Home Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Charts Skeletons */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses per Month</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-md" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Spenders</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-full max-w-[250px] max-h-[250px]" />
        </CardContent>
      </Card>
    </div>
  );
}
