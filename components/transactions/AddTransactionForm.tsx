"use client";

import { useFormStatus } from "react-dom";
import { addTransaction } from "@/app/actions/transactionActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-2">
      {pending ? "Adding..." : "Add Transaction"}
    </Button>
  );
}

interface User {
  id: number;
  name: string;
}

interface AddTransactionFormProps {
  users: User[]; // Array of all users
}

export default function AddTransactionForm({ users }: AddTransactionFormProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            const description = formData.get("description") as string;
            const amount = Number(formData.get("amount"));
            const payerId = Number(formData.get("payerId"));

            const result = await addTransaction({
              description,
              amount,
              payerId,
            });

            if (result.success)
              toast.success(
                `Transaction added: ${result.transaction?.description}`
              );
            else toast.error(result.error || "Failed to add transaction");
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Groceries"
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="amount">Amount (₱)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="1000"
              min={0}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="payerId">Payer</Label>
            <select
              id="payerId"
              name="payerId"
              required
              className="border rounded-md p-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} (ID: {user.id})
                </option>
              ))}
            </select>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
