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
      {/* Totals */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Total Paid</p>
            <p className="text-lg">₱{data.totalPaid}</p>
          </div>
          <div>
            <p className="font-semibold">Total Owed</p>
            <p className="text-lg">₱{data.totalOwed}</p>
          </div>
          <div>
            <p className="font-semibold">Total Receivable</p>
            <p className="text-lg">₱{data.totalReceivable}</p>
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
