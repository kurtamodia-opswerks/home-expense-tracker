import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Homes Table
export const homesTable = sqliteTable("homes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertHome = typeof homesTable.$inferInsert;
export type SelectHome = typeof homesTable.$inferSelect;

// Users Table
export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kindeId: text("kinde_id").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  homeId: integer("home_id").references(() => homesTable.id, {
    onDelete: "cascade",
  }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// Transactions Table
export const transactionsTable = sqliteTable("transactions", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  payerId: integer("payer_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  homeId: integer("home_id")
    .notNull()
    .references(() => homesTable.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  isSettled: integer("is_settled", { mode: "boolean" })
    .default(false)
    .notNull(),
});

export type InsertTransaction = typeof transactionsTable.$inferInsert;
export type SelectTransaction = typeof transactionsTable.$inferSelect;

// Transaction Shares Table
export const transactionSharesTable = sqliteTable("transaction_shares", {
  id: integer("id").primaryKey(),
  transactionId: integer("transaction_id")
    .notNull()
    .references(() => transactionsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  paid: integer("paid", { mode: "boolean" }).notNull().default(false),
});

export type InsertTransactionShare = typeof transactionSharesTable.$inferInsert;
export type SelectTransactionShare = typeof transactionSharesTable.$inferSelect;
