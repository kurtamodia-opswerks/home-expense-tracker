import { getOrCreateUser } from "./data/user/get-or-create-user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Users, ArrowRight } from "lucide-react";

export default async function LandingPage() {
  await getOrCreateUser();

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Simplify Shared Expenses with{" "}
          <span className="text-primary">RoomieSplit</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          The effortless way to manage expenses with roommates, friends, and
          family. Track bills, split costs, and settle up—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            How It Works
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How SplitEase Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join or Create a Home</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Connect with your housemates in a shared space and start
                managing expenses together seamlessly.
              </p>
              <Button variant="link" className="mt-4 gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-500 h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-500/10 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">Create Transactions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Record payments and expenses effortlessly so everyone knows
                where the money goes with detailed tracking.
              </p>
              <Button variant="link" className="mt-4 gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-green-500 h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 bg-green-500/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Manage Shares</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Keep track of who owes what and split bills fairly with
                customizable sharing options.
              </p>
              <Button variant="link" className="mt-4 gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-muted/50 rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">10K+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">$2M+</p>
            <p className="text-muted-foreground">Expenses Managed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">98%</p>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Ready to simplify shared expenses?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of users who are already managing their shared expenses
          effortlessly with SplitEase.
        </p>
        <Button size="lg" className="gap-2">
          Get Started For Free <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
