import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/app/data/user/get-users";
import { getOrCreateUser } from "@/app/data/user/get-or-create-user";

export default async function UserList() {
  const users = await getUsers();
  const currentUser = await getOrCreateUser();

  const filteredUsers = users.filter(
    (user) => user.homeId === currentUser?.homeId
  );

  return (
    <div className="w-full max-w-md mt-6 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Users You Are Housemates With</CardTitle>
          <CardDescription>
            {currentUser?.homeId
              ? `Members of your home (Home ID: ${currentUser.homeId})`
              : "You are not assigned to a home yet."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <p className="text-muted-foreground">No users found.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center border rounded-md p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  {user.id === currentUser?.id && (
                    <Badge variant="secondary">{"You"}</Badge>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
