import { type ResolvingMetadata } from "next";
import HomeAnalytics from "@/components/analytics/HomeAnalytics";
import HomeAnalyticsSkeleton from "@/components/home/loading/HomeAnalyticsSkeleton";
import { Suspense } from "react";

export default function HomePage({ params }: { params: { id: string } }) {
  const homeId = Number(params.id);

  return (
    <div className="p-6">
      <Suspense fallback={<HomeAnalyticsSkeleton />}>
        <HomeAnalytics homeId={homeId} />
      </Suspense>
    </div>
  );
}
