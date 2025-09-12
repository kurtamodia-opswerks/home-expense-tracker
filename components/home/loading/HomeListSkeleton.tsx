// components/home/HomeListSkeleton.tsx
import HomeCardSkeleton from "./HomeCardSkeleton";
import LeaveHomeCardSkeleton from "./LeaveHomeCardSkeleton";

export default function HomeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full mt-6 flex flex-col gap-4">
      {/* Leave Home Card */}
      <LeaveHomeCardSkeleton />

      {/* Grid of Home Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <HomeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
