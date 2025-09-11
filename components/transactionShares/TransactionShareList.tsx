// app/components/transactions/TransactionSharesListWrapper.tsx
import TransactionSharesListClient from "@/components/transactionShares/TransactionSharesListClient";
import type { SelectTransactionShare } from "@/db/schema";
import type { SelectUser } from "@/db/schema";

interface TransactionShare {
  id: number;
  transactionDate: string | null;
  transactionDescription: string | null;
  debtorId: number;
  debtorName: string | null;
  toPay: number;
  paid: number | null;
  receiverId: number;
  receiverName: string;
}

interface TransactionShareListProps {
  shares: TransactionShare[];
  user: SelectUser | null;
}

export default async function TransactionSharesListWrapper({
  shares,
  user,
}: TransactionShareListProps) {
  return <TransactionSharesListClient shares={shares} currentUser={user} />;
}
