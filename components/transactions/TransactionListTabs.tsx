"use client";

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
      <button
        className={`px-3 py-1 rounded ${
          activeTab === "all" ? "bg-primary text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded ${
          activeTab === "mine" ? "bg-primary text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("mine")}
      >
        My Transactions
      </button>
    </div>
  );
}
