// app/components/transactions/TransactionSharesListWrapper.tsx
import TransactionSharesListClient from "@/components/transactionShares/TransactionSharesListClient";
import { getTransactionShares } from "@/app/data/transaction/get-transaction-shares";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";

export default async function TransactionSharesListWrapper() {
  const shares = await getTransactionShares();
  const user = await getOrCreateUser();

  return <TransactionSharesListClient shares={shares} currentUser={user} />;
}
