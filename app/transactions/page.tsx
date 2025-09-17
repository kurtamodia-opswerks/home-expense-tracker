import TransactionList from "@/components/transactions/TransactionList";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { getUsers } from "../data/user/get-users";
import { getHomes } from "../data/home/get-homes";
import { getOrCreateUser } from "../data/user/get-or-create-user";
import TransactionCardSkeleton from "@/components/transactions/loading/TransactionCardSkeleton";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  Home,
  Users,
  Filter,
  Download,
  PhilippinePeso,
} from "lucide-react";
import { getTransactions } from "../data/transaction/get-transactions";

export default async function Transactions() {
  const users = await getUsers();
  const homes = await getHomes();
  const currentUser = await getOrCreateUser();

  // Calculate stats for the dashboard
  const userTransactions = await getTransactions();
  const userHomeTransactions = userTransactions.filter(
    (tx) => tx.homeId === currentUser?.homeId
  );
  const totalSpent = userHomeTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount),
    0
  );
  const userTransactionsCount = userHomeTransactions.length;
  const userTransactionsThisMonth = userHomeTransactions.filter((tx) => {
    const txDate = new Date(tx.createdAt);
    const now = new Date();
    return (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          Manage and track all your shared expenses in one place
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>
              <p className="text-2xl font-bold">₱ {totalSpent.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <PhilippinePeso className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </p>
              <p className="text-2xl font-bold">{userTransactionsCount}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500/10">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                This Month
              </p>
              <p className="text-2xl font-bold">{userTransactionsThisMonth}</p>
            </div>
            <div className="p-3 rounded-full bg-green-500/10">
              <Home className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Home Members
              </p>
              <p className="text-2xl font-bold">
                {users.filter((u) => u.homeId === currentUser?.homeId).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-amber-500/10">
              <Users className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="w-full">
        <CardContent className="p-0">
          <div className="p-6 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold">All Transactions</h2>

            <div className="flex flex-wrap gap-2">
              <AddTransactionModal
                users={users}
                homes={homes}
                currentUser={currentUser}
              />
            </div>
          </div>

          <Suspense fallback={<TransactionCardSkeleton />}>
            <TransactionList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
