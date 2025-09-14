import HomeAnalytics from "@/components/analytics/HomeAnalytics";
import HomeAnalyticsSkeleton from "@/components/home/loading/HomeAnalyticsSkeleton";
import { Suspense } from "react";

interface HomePageProps {
  params: { id: string };
}

export default function HomePage({ params }: HomePageProps) {
  const homeId = parseInt(params.id, 10);

  return (
    <div className="p-6">
      <Suspense fallback={<HomeAnalyticsSkeleton />}>
        <HomeAnalytics homeId={homeId} />
      </Suspense>
    </div>
  );
}
