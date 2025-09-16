"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteTransactionShare } from "@/app/actions/transactionShareActions";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { Trash } from "lucide-react";

interface DeleteShareButtonProps {
  shareId: number;
  buttonText?: string;
  variant?: any;
  size?: any;
}

export default function DeleteShareButton({
  shareId,
  buttonText,
  variant,
  size,
}: DeleteShareButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteTransactionShare(shareId);
      if (result.success) {
        toast.success("Deleted Share Successfully");
      } else {
        toast.error(result.error || "Failed to delete share");
      }
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={isPending || buttonText === "You"}
        variant="destructive"
        size="sm"
      >
        {buttonText ?? (isPending ? "Processing..." : <Trash />)}
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Payment"
        description="Are you sure you want to delete this share?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
