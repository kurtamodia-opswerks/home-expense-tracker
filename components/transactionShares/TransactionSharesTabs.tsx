"use client";

import { Button } from "../ui/button";

interface TransactionSharesTabsProps {
  activeTab: "all" | "receiver" | "debtor";
  onChange: (tab: "all" | "receiver" | "debtor") => void;
}

export default function TransactionSharesTabs({
  activeTab,
  onChange,
}: TransactionSharesTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Button
        variant={activeTab === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("all")}
      >
        All Transactions
      </Button>
      <Button
        variant={activeTab === "receiver" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("receiver")}
      >
        {"You're Owed"}
      </Button>
      <Button
        variant={activeTab === "debtor" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("debtor")}
      >
        You Owe
      </Button>
    </div>
  );
}
