"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteTransaction } from "@/app/actions/transactionActions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

interface DeleteTransactionButtonProps {
  transactionId: number;
}

export default function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTransaction(transactionId);
      if (result.success) toast.success("Transaction deleted successfully");
      else toast.error(result.error || "Failed to delete transaction");
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
        variant="destructive"
        className="flex items-center gap-2"
      >
        {isPending ? (
          "Deleting..."
        ) : (
          <>
            <Trash /> Delete
          </>
        )}
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
