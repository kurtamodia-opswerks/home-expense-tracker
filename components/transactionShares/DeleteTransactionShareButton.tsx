"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deleteTransactionShare } from "@/app/actions/transactionShareActions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Props {
  shareId: number;
}

export default function DeleteTransactionShareButton({ shareId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this transaction share?"))
      return;

    startTransition(async () => {
      const result = await deleteTransactionShare(shareId);
      if (result.success) toast.success("Transaction share deleted");
      else toast.error(result.error || "Failed to delete");
    });
  };

  return (
    <Button
      onClick={handleDelete}
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
  );
}
