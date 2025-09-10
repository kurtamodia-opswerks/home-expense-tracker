// components/users/UserList.tsx
import { getUsers } from "@/app/data/user/get-users";
import DeleteUserButton from "./DeleteUserButton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UserList() {
  const users = await getUsers();

  return (
    <Card className="w-full max-w-md mt-6">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {users.map((user) => (
              <li key={user.id} className="border p-2 rounded-md">
                <p>
                  <strong>{user.name}</strong> - {user.email}
                </p>
                {/* <DeleteUserButton userId={user.id} /> */}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
