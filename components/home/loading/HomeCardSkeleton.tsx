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
    <Card className="hover:shadow-lg transition-shadow flex flex-col justify-between max-w-xs">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-48 mt-1" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between mt-auto gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </CardContent>
    </Card>
  );
}
