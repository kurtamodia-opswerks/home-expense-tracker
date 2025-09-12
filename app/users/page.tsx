import UserInfoSkeleton from "@/components/users/loading/UserInfoSkeleton";
import UserListSkeleton from "@/components/users/loading/UserListSkeleton";
import UserInfo from "@/components/users/UserInfo";
import UserList from "@/components/users/UserList";
import { Suspense } from "react";

export default async function Users() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo />
      </Suspense>

      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}
