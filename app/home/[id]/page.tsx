import HomeAnalytics from "@/components/analytics/HomeAnalytics";
import HomeAnalyticsSkeleton from "@/components/home/loading/HomeAnalyticsSkeleton";
import { Suspense } from "react";

// Let Next.js infer params properly
type PageProps = {
  params: {
    id: string;
  };
};

export default function HomePage({ params }: PageProps) {
  const homeId = Number(params.id);

  return (
    <div className="p-6">
      <Suspense fallback={<HomeAnalyticsSkeleton />}>
        <HomeAnalytics homeId={homeId} />
      </Suspense>
    </div>
  );
}
