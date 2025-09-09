"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/app/actions/userActions";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

interface DeleteUserButtonProps {
  userId: number;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser(userId);

      if (result.success) toast.success("User deleted successfully");
      else toast.error(result.error || "Failed to delete user");
      setIsModalOpen(false); // close modal after action
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
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
