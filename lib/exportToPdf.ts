import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { SelectTransaction } from "@/db/schema";

interface TransactionShare {
  id: number;
  transactionDate: string | null;
  transactionDescription: string | null;
  debtorId: number | null;
  debtorName: string | null;
  receiverId: number | null;
  receiverName: string | null;
  toPay: number;
  paid: boolean;
}

export function exportTransactionsToPdf(
  transactions: (SelectTransaction & { payerName: string | null })[]
) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Transaction Report", 14, 20);

  // Table
  autoTable(doc, {
    startY: 30,
    head: [["Date", "Description", "Amount", "Payer"]],
    body: transactions.map((tx) => [
      new Date(tx.createdAt).toLocaleDateString(),
      tx.description || "No description",
      `₱ ${Number(tx.amount).toFixed(2)}`,
      tx.payerName || "Unknown",
    ]),
  });

  // Save file
  doc.save("transactions.pdf");
}

export function exportSharesToPdf(shares: TransactionShare[]) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Transaction Shares Report", 14, 20);

  // Table
  autoTable(doc, {
    startY: 30,
    head: [["Date", "Description", "Debtor", "Receiver", "Amount", "Status"]],
    body: shares.map((s) => [
      s.transactionDate
        ? new Date(s.transactionDate).toLocaleDateString()
        : "-",
      s.transactionDescription || "No description",
      s.debtorName || "Unknown",
      s.receiverName || "Unknown",
      `₱ ${s.toPay.toFixed(2)}`,
      s.paid ? "Paid" : "Pending",
    ]),
  });

  // Save file
  doc.save("transaction_shares.pdf");
}
