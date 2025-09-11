"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTransactionForm from "./AddTransactionForm";
import { SelectHome, SelectUser } from "@/db/schema";

interface AddTransactionModalProps {
  users: SelectUser[];
  homes: SelectHome[];
  currentUser: SelectUser | null;
}

export default function AddTransactionModal({
  users,
  homes,
  currentUser,
}: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Transaction</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <AddTransactionForm
          users={users}
          homes={homes}
          currentUser={currentUser}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
