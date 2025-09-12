import { getTransactionShares } from "@/app/data/transaction/get-transaction-shares";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import TransactionSharesListClient from "@/components/transactionShares/TransactionSharesListClient";

export default async function TransactionSharesListWrapper() {
  const shares = await getTransactionShares();
  const currentUser = await getOrCreateUser();
  return (
    <TransactionSharesListClient shares={shares} currentUser={currentUser} />
  );
}
