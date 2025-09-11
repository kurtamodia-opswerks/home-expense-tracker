"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import type { SelectUser } from "@/db/schema";
import { joinHome } from "@/app/actions/homeActions";

interface JoinHomeButtonProps {
  homeId: number;
  currentUser: SelectUser | null;
  alreadyInHome: boolean;
}

export default function JoinHomeButton({
  homeId,
  currentUser,
  alreadyInHome,
}: JoinHomeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const disabled = !!currentUser?.homeId && !alreadyInHome;

  const handleJoin = () => {
    if (!currentUser) return;
    startTransition(async () => {
      await joinHome(currentUser.id, homeId);
    });
  };

  return (
    <Button
      disabled={disabled || isPending || alreadyInHome}
      onClick={handleJoin}
      variant={alreadyInHome ? "secondary" : "default"}
    >
      {alreadyInHome ? "Joined" : "Join"}
    </Button>
  );
}
