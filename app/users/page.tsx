import UserInfo from "@/components/users/UserInfo";
import UserList from "@/components/users/UserList";
import { getUsers } from "../data/user/get-users";
import { getOrCreateUser } from "../data/user/get-or-create-user";

export default async function Users() {
  const users = await getUsers();
  const currentUser = await getOrCreateUser();
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Home Expense Tracker App</h1>
      <UserInfo currentUser={currentUser} />
      <UserList users={users} currentUser={currentUser} />
    </div>
  );
}
