"use client";

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
          activeTab === "receiver" ? "bg-primary text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("receiver")}
      >
        As Receiver
      </button>
      <button
        className={`px-3 py-1 rounded ${
          activeTab === "debtor" ? "bg-primary text-white" : "bg-gray-200"
        }`}
        onClick={() => onChange("debtor")}
      >
        As Debtor
      </button>
    </div>
  );
}
