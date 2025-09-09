"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { transactionSharesTable } from "@/db/schema";
import { revalidateTag } from "next/cache";

// Delete a transaction share
export async function deleteTransactionShare(shareId: number) {
  try {
    await db
      .delete(transactionSharesTable)
      .where(eq(transactionSharesTable.id, shareId));
    revalidateTag("transactionShares");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction share" };
  }
}
