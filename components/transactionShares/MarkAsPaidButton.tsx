"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { markPaidTransactionShare } from "@/app/actions/transactionShareActions";
import ConfirmModal from "@/components/ConfirmModal";
import { CircleCheck } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MarkAsPaidButtonProps {
  shareId: number;
  isDebtor?: boolean;
  variant: any;
  size?: any;
}

export default function MarkAsPaidButton({
  shareId,
  isDebtor,
  variant,
  size,
}: MarkAsPaidButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await markPaidTransactionShare(shareId);
      if (result.success) {
        toast.success("Marked as paid");
      } else {
        toast.error(result.error || "Failed to mark as paid");
      }
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={isPending}
              variant={variant}
              size={size}
            >
              {isDebtor ? isPending ? "..." : <CircleCheck /> : <CircleCheck />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as Paid</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Payment"
        description="Are you sure you want to mark this transaction share as paid?"
        confirmText="Mark as Paid"
        cancelText="Cancel"
      />
    </>
  );
}
