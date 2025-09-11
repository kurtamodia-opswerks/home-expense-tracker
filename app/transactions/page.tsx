import TransactionList from "@/components/transactions/TransactionList";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { getUsers } from "../data/user/get-users";
import { getHomes } from "../data/home/home-mutations";
import { getOrCreateUser } from "../data/user/get-or-create-user";

export default async function Transactions() {
  const users = await getUsers();
  const homes = await getHomes();
  const currentUser = await getOrCreateUser();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      {/* Add new transaction via modal */}
      <AddTransactionModal
        users={users}
        homes={homes}
        currentUser={currentUser}
      />

      {/* Table of transactions */}
      <TransactionList />
    </div>
  );
}
