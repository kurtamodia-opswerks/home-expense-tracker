// app/transaction-shares/page.tsx
import { db } from "@/db/index";
import {
  usersTable,
  transactionsTable,
  SelectUser,
  SelectTransaction,
} from "@/db/schema";
import TransactionShareList from "@/components/transactionShares/TransactionShareList";

import { unstable_cache } from "next/cache";

// Cache queries for users
const getUsers = unstable_cache(
  async (): Promise<SelectUser[]> => {
    return await db.select().from(usersTable).all();
  },
  ["users"],
  { tags: ["users"] }
);

// Cache queries for transactions
const getTransactions = unstable_cache(
  async (): Promise<SelectTransaction[]> => {
    return await db.select().from(transactionsTable).all();
  },
  ["transactions"],
  { tags: ["transactions"] }
);

export default async function TransactionShares() {
  const users = await getUsers();
  const transactions = await getTransactions();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Transaction Shares</h1>
      <TransactionShareList />
    </div>
  );
}
