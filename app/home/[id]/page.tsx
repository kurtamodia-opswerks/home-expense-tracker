import HomeAnalytics from "@/components/analytics/HomeAnalytics";
import HomeAnalyticsSkeleton from "@/components/home/loading/HomeAnalyticsSkeleton";
import { Suspense } from "react";

export default async function HomePage(props: PageProps<"/home/[id]">) {
  const { id } = await props.params;
  console.log(id);

  return (
    <div className="p-6">
      <Suspense fallback={<HomeAnalyticsSkeleton />}>
        <HomeAnalytics homeId={Number(id)} />
      </Suspense>
    </div>
  );
}
