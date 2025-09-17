import { getHomeAnalytics } from "@/app/actions/analytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Charts from "./HomeAnalyticsCharts";

export default async function HomeAnalytics({ homeId }: { homeId: number }) {
  type Analytics = Awaited<ReturnType<typeof getHomeAnalytics>>;
  const data: Analytics = await getHomeAnalytics(homeId);

  if (!data) {
    return (
      <div className="p-4 space-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Summary Metrics */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Home Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-semibold">
              ₱{data.totalExpenses.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Most Frequent Purchase
            </p>
            <p className="text-lg font-medium">
              {data.mostFrequentPurchase?.description ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Highest Expense Category
            </p>
            <p className="text-lg font-medium">
              {data.highestExpenseCategory?.description ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Biggest Transaction</p>
            <p className="text-lg font-medium">
              {data.biggestTransaction?.description ?? "N/A"} ( ₱
              {data.biggestTransaction?.amount?.toLocaleString() ?? 0})
            </p>
          </div>
        </CardContent>
      </Card>

      <Charts
        monthlyExpenses={data.monthlyExpenses}
        topSpenders={data.topSpenders}
      />
    </div>
  );
}
