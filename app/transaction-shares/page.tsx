// app/transaction-shares/page.tsx
import TransactionShareList from "@/components/transactionShares/TransactionShareList";
import { getTransactionShares } from "../data/transaction/get-transaction-shares";
import { getOrCreateUser } from "../data/user/get-or-create-user";

export default async function TransactionShares() {
  const shares = await getTransactionShares();
  const currentUser = await getOrCreateUser();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transaction Shares</h1>
      <TransactionShareList shares={shares} user={currentUser} />
    </div>
  );
}
