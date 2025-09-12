import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-48 mt-1" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end mt-auto">
        <Skeleton className="h-8 w-20" />
      </CardContent>
    </Card>
  );
}
