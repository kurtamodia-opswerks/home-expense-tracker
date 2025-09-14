import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import HomeForm from "@/components/home/HomeForm";
import HomeListClient from "@/components/home/HomeListClient";
import HomeListSkeleton from "@/components/home/loading/HomeListSkeleton";
import LeaveHomeCardSkeleton from "@/components/home/loading/LeaveHomeCardSkeleton";
import { Suspense } from "react";

export default async function HomesPage() {
  const currentUser = await getOrCreateUser();

  return (
    <div className="flex flex-col p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-6">Homes</h1>
          <div className="flex flex-col justify-between gap-10">
            {" "}
            <HomeForm userId={currentUser?.id ?? 0} />
            <Suspense fallback={<LeaveHomeCardSkeleton />}>
              <HomeListClient.SidePanel currentUser={currentUser} />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<HomeListSkeleton />}>
            <HomeListClient.MainContent currentUser={currentUser} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
