"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addTransactionWithShares } from "@/app/actions/transactionActions";
import { SelectUser, SelectHome, SelectUser as User } from "@/db/schema";

import TransactionFields from "./TransactionFields";
import ParticipantSelector from "./ParticipantSelector";
import TransactionActions from "./TransactionActions";
import CustomSplitDrawer from "./CustomSplitDrawer";

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
  const [payerId, setPayerId] = useState<string>(
    currentUser?.id?.toString() ?? ""
  );
  const [homeId, setHomeId] = useState<string>(
    currentUser?.homeId?.toString() ?? ""
  );
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customShares, setCustomShares] = useState<
    { userId: number; amount: number }[]
  >([]);

  const participants = users.filter((u) => u.homeId === currentUser?.homeId);

  const handleEqualSplit = async () => {
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
        resetForm();
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to create transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSplitSubmit = async () => {
    const total = customShares.reduce((sum, s) => sum + s.amount, 0);
    if (total !== Number(amount)) {
      toast.error("Total shares must equal the transaction amount");
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
        customShares,
      });

      if (result.success) {
        toast.success(
          `Transaction created: ${result.transaction?.description}`
        );
        resetForm();
        setDrawerOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to create transaction");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setPayerId("");
    setHomeId(currentUser?.homeId?.toString() ?? "");
    setSelectedUsers([]);
    setCustomShares([]);
  };

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <TransactionFields
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          payerId={payerId}
          setPayerId={setPayerId}
          homeId={homeId}
          homes={homes}
          participants={participants}
        />

        <ParticipantSelector
          participants={participants}
          selectedUsers={selectedUsers}
          onChange={(userId, checked) =>
            checked
              ? setSelectedUsers([...selectedUsers, userId])
              : setSelectedUsers(selectedUsers.filter((id) => id !== userId))
          }
        />

        <TransactionActions
          loading={loading}
          homeId={homeId}
          onEqualSplit={handleEqualSplit}
          onCustomSplit={() => {
            setCustomShares(
              selectedUsers.map((id) => ({ userId: id, amount: 0 }))
            );
            setDrawerOpen(true);
          }}
        />
      </form>

      <CustomSplitDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        amount={amount}
        selectedUsers={selectedUsers}
        participants={participants}
        customShares={customShares}
        setCustomShares={setCustomShares}
        onSubmit={handleCustomSplitSubmit}
        loading={loading}
      />
    </>
  );
}
