import AddUserForm from "@/components/users/AddUserForm";
import UserList from "@/components/users/UserList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Home Expense Tracker App</h1>
      <AddUserForm />
      <UserList />
    </div>
  );
}
