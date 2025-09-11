// app/transaction-shares/page.tsx
import TransactionShareList from "@/components/transactionShares/TransactionShareList";

export default async function TransactionShares() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transaction Shares</h1>
      <TransactionShareList />
    </div>
  );
}
