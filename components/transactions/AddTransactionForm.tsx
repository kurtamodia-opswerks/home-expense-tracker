"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { addTransactionWithShares } from "@/app/actions/transactionActions";
import { SelectUser, SelectHome, SelectUser as User } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  homes: SelectHome[];
  currentUser: User | null;
  onSuccess?: () => void;
}

export default function AddTransactionForm({
  users,
  homes,
  currentUser,
  onSuccess,
}: AddTransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [payerId, setPayerId] = useState<string>("");
  const [homeId, setHomeId] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Preselect the user's home and payer
  useEffect(() => {
    if (currentUser?.homeId) {
      setHomeId(currentUser.homeId.toString());
    }
    if (currentUser?.id) {
      setPayerId(currentUser.id.toString());
    }
  }, [currentUser?.homeId, currentUser?.id]);

  // Only show users in the same home
  const participants = users.filter((u) => u.homeId === currentUser?.homeId);

  const handleCheckboxChange = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !description ||
      !amount ||
      !payerId ||
      !homeId ||
      selectedUsers.length === 0
    ) {
      toast.error("Please fill all fields and select at least one participant");
      return;
    }

    try {
      setLoading(true);
      const result = await addTransactionWithShares({
        description,
        amount: Number(amount),
        payerId: Number(payerId),
        homeId: Number(homeId),
        userIds: selectedUsers,
      });

      if (result.success) {
        toast.success(
          `Transaction created: ${result.transaction?.description}`
        );
        setDescription("");
        setAmount("");
        setPayerId("");
        setHomeId(currentUser?.homeId?.toString() ?? "");
        setSelectedUsers([]);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to create transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Description */}
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

      {/* Amount */}
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

      {/* Payer (disabled, always current user) */}
      <div className="flex flex-col">
        <Label htmlFor="payer">Payer</Label>
        <Select value={payerId} disabled>
          <SelectTrigger>
            <SelectValue placeholder="No payer assigned" />
          </SelectTrigger>
          <SelectContent>
            {participants.map((u) => (
              <SelectItem key={u.id} value={u.id.toString()}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Home (disabled, just showing current home) */}
      <div className="flex flex-col">
        <Label htmlFor="home">Home</Label>
        <Select value={homeId} disabled>
          <SelectTrigger>
            <SelectValue placeholder="No home assigned" />
          </SelectTrigger>
          <SelectContent>
            {homes.map((h) => (
              <SelectItem key={h.id} value={h.id.toString()}>
                {h.name} — {h.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Participants */}
      <div className="flex flex-col">
        <Label>Participants</Label>
        <ScrollArea className="max-h-48 border rounded p-2">
          <div className="flex flex-col gap-2">
            {participants.map((u) => (
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

      <Button type="submit" disabled={loading || homeId === ""}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}
