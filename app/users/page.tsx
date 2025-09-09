import AddUserForm from "@/components/users/AddUserForm";
import UserList from "@/components/users/UserList";

export default async function Users() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Home Expense Tracker App</h1>
      <AddUserForm />
      <UserList />
    </div>
  );
}
