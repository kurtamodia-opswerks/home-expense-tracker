"use client";

import { useTransition, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteTransactionShare } from "@/app/actions/transactionShareActions";
import ConfirmModal from "@/components/ConfirmModal";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { VariantProps } from "class-variance-authority";

interface DeleteShareButtonProps {
  shareId: number;
  buttonText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

export default function DeleteShareButton({
  shareId,
  buttonText,
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={isPending || buttonText === "You"}
              variant={"destructive"}
              size={size ?? "sm"}
            >
              {buttonText ?? (isPending ? "Processing..." : <Trash />)}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Share</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Deletion"
        description="Are you sure you want to delete this share?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
