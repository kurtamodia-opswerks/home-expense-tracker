"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import type { SelectUser } from "@/db/schema";
import { leaveHome } from "@/app/actions/homeActions";
import ConfirmModal from "../ConfirmModal";

interface LeaveHomeButtonProps {
  currentUser: SelectUser;
}

export default function LeaveHomeButton({ currentUser }: LeaveHomeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLeaveConfirm = () => {
    startTransition(async () => {
      await leaveHome(currentUser.id);
      setIsConfirmOpen(false);
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        variant="destructive"
        onClick={() => setIsConfirmOpen(true)}
      >
        Leave Home
      </Button>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleLeaveConfirm}
        title="Leave Home"
        description="Are you sure you want to leave this home?"
        confirmText="Leave"
        cancelText="Cancel"
      />
    </>
  );
}
