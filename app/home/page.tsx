import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import HomeForm from "@/components/home/HomeForm";
import HomeList from "@/components/home/HomeList";
import HomeListSkeleton from "@/components/home/loading/HomeListSkeleton";
import { Suspense } from "react";

export default async function HomesPage() {
  const currentUser = await getOrCreateUser();

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Homes</h1>

      {/* Create new home */}
      <HomeForm userId={currentUser?.id ?? 0} />

      <Suspense fallback={<HomeListSkeleton />}>
        <HomeList currentUser={currentUser} />
      </Suspense>
    </div>
  );
}
