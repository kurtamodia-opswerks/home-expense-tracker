// components/users/UserList.tsx
import { db } from "@/db/index";
import { usersTable } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Wrap query in a cache with "users" tag
const getUsers = unstable_cache(
  async () => await db.select().from(usersTable).all(),
  ["users"],
  { tags: ["users"] }
);

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
                  <strong>{user.name}</strong> ({user.age}) - {user.email}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
