// app/transaction-shares/page.tsx
import { getUsers } from "../data/user/get-users";
import TransactionShareList from "@/components/transactionShares/TransactionShareList";
import { getTransactions } from "../data/transaction/get-transactions";

export default async function TransactionShares() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transaction Shares</h1>
      <TransactionShareList />
    </div>
  );
}
