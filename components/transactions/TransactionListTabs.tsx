"use client";

import { Button } from "../ui/button";

interface TransactionListTabsProps {
  activeTab: "all" | "mine";
  onChange: (tab: "all" | "mine") => void;
}

export default function TransactionListTabs({
  activeTab,
  onChange,
}: TransactionListTabsProps) {
  return (
    <div className="flex gap-2 mt-2">
      <Button
        className={`px-3 py-1 rounded ${
          activeTab === "all" ? "bg-primary" : "bg-gray-400"
        }`}
        onClick={() => onChange("all")}
      >
        Current Home Transactions
      </Button>
      <Button
        className={`px-3 py-1 rounded ${
          activeTab === "mine" ? "bg-primary" : "bg-gray-400"
        }`}
        onClick={() => onChange("mine")}
      >
        My Transactions
      </Button>
    </div>
  );
}
