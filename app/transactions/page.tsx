import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import { getUsers } from "../data/user/get-users";

export default async function Transactions() {
  // Fetch all users to pass their IDs to the AddTransactionForm
  const users = await getUsers();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      {/* Add new transaction */}
      <AddTransactionForm users={users} />

      {/* List of transactions */}
      <TransactionList />
    </div>
  );
}
