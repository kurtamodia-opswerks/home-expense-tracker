"use client";

import { Button } from "@/components/ui/button";

interface TransactionActionsProps {
  loading: boolean;
  homeId: string;
  onEqualSplit: () => void;
  onCustomSplit: () => void;
}

export default function TransactionActions({
  loading,
  homeId,
  onEqualSplit,
  onCustomSplit,
}: TransactionActionsProps) {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        disabled={loading || homeId === ""}
        onClick={onEqualSplit}
      >
        {loading ? "Adding..." : "Split Equally"}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={loading || homeId === ""}
        onClick={onCustomSplit}
      >
        Custom Split
      </Button>
    </div>
  );
}
