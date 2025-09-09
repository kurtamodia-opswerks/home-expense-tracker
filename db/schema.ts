import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// --------------------
// Users Table
// --------------------
export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").unique().notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// --------------------
// Transactions Table
// Each expense logged in the house
// --------------------
export const transactionsTable = sqliteTable("transactions", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(), // e.g., "Groceries", "Electricity"
  amount: integer("amount").notNull(), // stored in cents to avoid float issues
  payerId: integer("payer_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertTransaction = typeof transactionsTable.$inferInsert;
export type SelectTransaction = typeof transactionsTable.$inferSelect;

// --------------------
// Transaction Shares Table
// Who owes how much for each transaction
// --------------------
export const transactionSharesTable = sqliteTable("transaction_shares", {
  id: integer("id").primaryKey(),
  transactionId: integer("transaction_id")
    .notNull()
    .references(() => transactionsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // how much this user owes
  paid: integer("paid").default(0), // how much has been paid
});

export type InsertTransactionShare = typeof transactionSharesTable.$inferInsert;
export type SelectTransactionShare = typeof transactionSharesTable.$inferSelect;
