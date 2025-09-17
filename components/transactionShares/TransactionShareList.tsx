import { getTransactionShares } from "@/app/data/transaction/get-transaction-shares";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import TransactionSharesListClient from "@/components/transactionShares/TransactionSharesListClient";

export default async function TransactionSharesListWrapper() {
  type SelectTransactionShare = Awaited<
    ReturnType<typeof getTransactionShares>
  >;
  type SelectUser = Awaited<ReturnType<typeof getOrCreateUser>>;
  const shares: SelectTransactionShare = await getTransactionShares();
  const currentUser: SelectUser = await getOrCreateUser();
  return (
    <TransactionSharesListClient shares={shares} currentUser={currentUser} />
  );
}
