import UserInfoSkeleton from "@/components/users/loading/UserInfoSkeleton";
import UserListSkeleton from "@/components/users/loading/UserListSkeleton";
import UserInfo from "@/components/users/UserInfo";
import UserList from "@/components/users/UserList";
import UserAnalytics from "@/components/analytics/UserAnalytics";
import { Suspense } from "react";
import UserAnalyticsSkeleton from "@/components/users/loading/UserAnalyticsSkeleton";

export default async function Users() {
  return (
    <div className="flex flex-col gap-8 p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="md:col-span-1 -mt-6">
          <Suspense fallback={<UserInfoSkeleton />}>
            <UserInfo />
          </Suspense>
          <Suspense fallback={<UserListSkeleton />}>
            <UserList />
          </Suspense>
        </div>

        <div className="md:col-span-2">
          <Suspense fallback={<UserAnalyticsSkeleton />}>
            <UserAnalytics />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
