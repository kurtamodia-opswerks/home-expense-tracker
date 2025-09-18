import HomeAnalytics from "@/components/analytics/HomeAnalytics";
import HomeAnalyticsSkeleton from "@/components/home/loading/HomeAnalyticsSkeleton";
import { Suspense } from "react";

export default function HomePage({ params }: any) {
  const homeId = parseInt(params.id, 10);

  return (
    <div className="p-6">
      <Suspense fallback={<HomeAnalyticsSkeleton />}>
        <HomeAnalytics homeId={homeId} />
      </Suspense>
    </div>
  );
}
