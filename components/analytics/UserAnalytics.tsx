import { getUserAnalytics } from "@/app/actions/analytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserAnalyticsCharts from "./UserAnalyticsCharts";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";

export default async function UserAnalytics() {
  const user = await getOrCreateUser();

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <p>User not found.</p>
      </div>
    );
  }

  const data = await getUserAnalytics(user.id);

  if (!data) {
    return (
      <div className="p-4 space-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Summary Metrics */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="text-2xl font-semibold">
              ₱{data.totalPaid.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Owed</p>
            <p className="text-2xl font-semibold">
              ₱{data.totalOwed.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Receivable</p>
            <p className="text-2xl font-semibold">
              ₱{data.totalReceivable.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <UserAnalyticsCharts
        totalOwed={data.totalOwed}
        totalReceivable={data.totalReceivable}
      />
    </div>
  );
}
