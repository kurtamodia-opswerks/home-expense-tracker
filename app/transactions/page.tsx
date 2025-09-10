import TransactionList from "@/components/transactions/TransactionList";
import { getUsers } from "../data/user/get-users";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";

export default async function Transactions() {
  const users = await getUsers();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      {/* Add new transaction via modal */}
      <AddTransactionModal users={users} />

      {/* Table of transactions */}
      <TransactionList />
    </div>
  );
}
