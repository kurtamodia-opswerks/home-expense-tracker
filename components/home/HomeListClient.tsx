import type { SelectUser } from "@/db/schema";
import HomeCard from "./HomeCard";
import LeaveHomeCard from "./LeaveHomeCard";
import { getHomes } from "@/app/data/home/get-homes";

interface HomeListClientProps {
  currentUser: SelectUser | null;
}

async function SidePanel({ currentUser }: HomeListClientProps) {
  return (
    <>{currentUser?.homeId && <LeaveHomeCard currentUser={currentUser} />}</>
  );
}

async function MainContent({ currentUser }: HomeListClientProps) {
  const homes = await getHomes();
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Available Homes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.map((home) => (
          <HomeCard key={home.id} home={home} currentUser={currentUser} />
        ))}
      </div>
    </>
  );
}

const HomeListClient = { SidePanel, MainContent };
export default HomeListClient;
