// app/transaction-shares/page.tsx
import TransactionShareList from "@/components/transactionShares/TransactionShareList";
import { getTransactionShares } from "../data/transaction/get-transaction-shares";
import { getOrCreateUser } from "../data/user/get-or-create-user";
import { Suspense } from "react";
import TransactionSharesSkeleton from "@/components/transactionShares/loading/TransactionSharesSkeleton";

export default async function TransactionShares() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transaction Shares</h1>
      <Suspense fallback={<TransactionSharesSkeleton />}>
        <TransactionShareList />
      </Suspense>
    </div>
  );
}
