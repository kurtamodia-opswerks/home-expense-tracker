"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectUser, SelectHome } from "@/db/schema";

interface TransactionFieldsProps {
  description: string;
  setDescription: (val: string) => void;
  amount: number | "";
  setAmount: (val: number | "") => void;
  payerId: string;
  setPayerId: (val: string) => void;
  homeId: string;
  homes: SelectHome[];
  participants: SelectUser[];
}

export default function TransactionFields({
  description,
  setDescription,
  amount,
  setAmount,
  payerId,
  setPayerId,
  homeId,
  homes,
  participants,
}: TransactionFieldsProps) {
  return (
    <>
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

      {/* Payer */}
      <div className="flex flex-col">
        <Label htmlFor="payer">Payer</Label>
        <Select value={payerId} onValueChange={setPayerId}>
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

      {/* Home */}
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
    </>
  );
}
