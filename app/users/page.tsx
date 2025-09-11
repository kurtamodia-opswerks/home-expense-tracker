import UserInfo from "@/components/users/UserInfo";
import UserList from "@/components/users/UserList";
import { Suspense } from "react";

export default async function Users() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Home Expense Tracker App</h1>
      <Suspense fallback={<span>Loading...</span>}>
        <UserInfo />
        <UserList />
      </Suspense>
    </div>
  );
}
