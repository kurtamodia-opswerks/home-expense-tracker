import { getHomeAnalytics } from "@/app/actions/analytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Charts from "./HomeAnalyticsCharts";

export default async function HomeAnalytics({ homeId }: { homeId: number }) {
  const data = await getHomeAnalytics(homeId);

  if (!data) {
    return (
      <div className="p-4 space-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Total Expenses */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">₱{data.totalExpenses}</p>
        </CardContent>
      </Card>
      <Charts
        monthlyExpenses={data.monthlyExpenses}
        topSpenders={data.topSpenders}
      />
    </div>
  );
}
