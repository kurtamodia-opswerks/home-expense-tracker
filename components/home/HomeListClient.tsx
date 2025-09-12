import type { SelectUser } from "@/db/schema";
import HomeCard from "./HomeCard";
import LeaveHomeCard from "./LeaveHomeCard";
import { getHomes } from "@/app/data/home/get-homes";

interface HomeListClientProps {
  currentUser: SelectUser | null;
}

export default async function HomeListClient({
  currentUser,
}: HomeListClientProps) {
  const homes = await getHomes();
  return (
    <div className="w-full mt-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Available Homes</h2>

      {currentUser?.homeId && <LeaveHomeCard currentUser={currentUser} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map((home) => (
          <HomeCard key={home.id} home={home} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
