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
    <div className="flex gap-2 mt-2">
      <Button
        className={`px-3 py-1 rounded ${
          activeTab === "all" ? "bg-primary" : "bg-gray-400"
        }`}
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <Button
        className={`px-3 py-1 rounded ${
          activeTab === "receiver" ? "bg-primary" : "bg-gray-400"
        }`}
        onClick={() => onChange("receiver")}
      >
        As Creditor
      </Button>
      <Button
        className={`px-3 py-1 rounded ${
          activeTab === "debtor" ? "bg-primary" : "bg-gray-400"
        }`}
        onClick={() => onChange("debtor")}
      >
        As Debtor
      </Button>
    </div>
  );
}
