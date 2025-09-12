// components/home/LeaveHomeCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaveHomeCardSkeleton() {
  return (
    <Card className="bg-gray-50">
      <CardContent className="flex justify-between items-center">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-20" />
      </CardContent>
    </Card>
  );
}
