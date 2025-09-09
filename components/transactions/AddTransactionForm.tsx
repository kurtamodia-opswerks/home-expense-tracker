"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addTransactionWithShares } from "@/app/actions/transactionActions";
import { SelectUser } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddTransactionFormProps {
  users: SelectUser[];
}

export default function AddTransactionForm({ users }: AddTransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [payerId, setPayerId] = useState<string>("");
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
            <Select
              value={payerId} // string
              onValueChange={(value) => setPayerId(value)} // value is string
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payer" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id.toString()}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <Label>Participants</Label>
            <ScrollArea className="max-h-48 border rounded p-2">
              <div className="flex flex-col gap-2">
                {users.map((u) => (
                  <label key={u.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedUsers.includes(u.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(u.id, Boolean(checked))
                      }
                      className="ml-2"
                    />
                    {u.name}
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
