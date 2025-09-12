import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";

export default async function UserList() {
  const currentUser = await getOrCreateUser();
  return (
    <>
      {/* User information */}
      <Card className="w-full max-w-md mt-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Details about your account and home assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentUser ? (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Name:</span>
                <span>{currentUser.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Email:</span>
                <span>{currentUser.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Home:</span>
                {currentUser.homeId ? (
                  <Badge variant="secondary">{`Home #${currentUser.homeId}`}</Badge>
                ) : (
                  <Badge variant="destructive">No home assigned</Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No user information available.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
