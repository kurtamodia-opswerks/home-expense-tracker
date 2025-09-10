// app/components/transactions/TransactionListWrapper.tsx
import TransactionListClient from "@/components/transactions/TransactionListClient";
import { getTransactions } from "@/app/data/transaction/get-transactions";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";
import type { SelectTransaction } from "@/db/schema";

export default async function TransactionListWrapper() {
  const transactions: (SelectTransaction & { payerName: string | null })[] =
    await getTransactions();

  // Get logged-in user
  const user = await getOrCreateUser();

  return (
    <TransactionListClient transactions={transactions} currentUser={user} />
  );
}
