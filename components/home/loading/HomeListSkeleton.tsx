import HomeCardSkeleton from "./HomeCardSkeleton";
import LeaveHomeCardSkeleton from "./LeaveHomeCardSkeleton";

export default function HomeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full mt-6 flex flex-col gap-4">
      {/* Section Title */}
      <div className="w-md mx-auto flex flex-col gap-4">
        <LeaveHomeCardSkeleton />
      </div>

      {/* Grid of Home Cards */}
      <div className="w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <HomeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
