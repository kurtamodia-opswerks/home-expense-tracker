// components/AddUserForm.tsx
"use client";

import { useFormStatus } from "react-dom";
import { addUser } from "@/app/actions/userActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-2">
      {pending ? "Adding..." : "Add User"}
    </Button>
  );
}

export default function AddUserForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            const name = formData.get("name") as string;
            const age = Number(formData.get("age"));
            const email = formData.get("email") as string;

            const result = await addUser({ name, age, email });

            if (result.success) {
              toast.success(`User created: ${result.user?.name}`);
            } else {
              toast.error(result.error || "Failed to add user");
            }
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter name" required />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Enter age"
              min={1}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
