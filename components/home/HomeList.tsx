import type { SelectUser } from "@/db/schema";
import LeaveHomeCard from "./LeaveHomeCard";
import { getHomes } from "@/app/data/home/get-homes";
import HomeListClient from "./HomeListClient";

interface HomeListProps {
  currentUser: SelectUser | null;
}

export default async function HomeList({ currentUser }: HomeListProps) {
  const homes = await getHomes();

  return (
    <div className="w-full mt-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Available Homes</h2>

      {currentUser?.homeId && <LeaveHomeCard currentUser={currentUser} />}

      <HomeListClient homes={homes} currentUser={currentUser} />
    </div>
  );
}
