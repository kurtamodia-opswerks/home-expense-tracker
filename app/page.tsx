import { getOrCreateUser } from "./data/user/get-or-create-user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function LandingPage() {
  await getOrCreateUser();

  return (
    <div className="flex w-max-xl flex-col items-center gap-6 mt-15">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Your Solution to Shared Expenses
      </h2>

      <div className="flex flex-col gap-6 mt-8 w-max-xl">
        {/* Card 1 */}
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Join a Home</CardTitle>
          </CardHeader>
          <CardContent>
            Connect with your housemates and start managing shared expenses
            seamlessly.
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Create Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            Record your payments and expenses easily so everyone knows where the
            money goes.
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Manage Shares</CardTitle>
          </CardHeader>
          <CardContent>
            Keep track of who owes what and split bills fairly among your
            housemates.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
