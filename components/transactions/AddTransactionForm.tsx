"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addTransactionWithShares } from "@/app/actions/transactionActions";
import { SelectUser } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface AddTransactionFormProps {
  users: SelectUser[];
}

export default function AddTransactionForm({ users }: AddTransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [payerId, setPayerId] = useState<number | "">("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !payerId || selectedUsers.length === 0) {
      toast.error("Please fill all fields and select at least one participant");
      return;
    }

    try {
      setLoading(true);

      const result = await addTransactionWithShares({
        description,
        amount: Number(amount),
        payerId: Number(payerId),
        userIds: selectedUsers,
      });

      if (result.success) {
        toast.success(
          `Transaction created: ${result.transaction?.description}`
        );
        setDescription("");
        setAmount("");
        setPayerId("");
        setSelectedUsers([]);
      } else {
        toast.error(result.error || "Failed to create transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Groceries, Electricity..."
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Total amount"
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="payer">Payer</Label>
            <select
              id="payer"
              value={payerId}
              onChange={(e) => setPayerId(Number(e.target.value))}
              required
            >
              <option value="">Select payer</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <Label>Participants</Label>
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {users.map((u) => (
                <label key={u.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(u.id)}
                    onChange={(e) =>
                      handleCheckboxChange(u.id, e.target.checked)
                    }
                  />
                  {u.name}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
