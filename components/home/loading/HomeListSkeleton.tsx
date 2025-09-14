import HomeCardSkeleton from "./HomeCardSkeleton";

export default function HomeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4">Available Homes</h2>

      {/* Grid of Home Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <HomeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
