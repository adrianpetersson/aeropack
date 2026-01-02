import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// -----------------------------------------------------------------------------
// 1. Weight Library (Global Knowledge Base of generic item weights)
// -----------------------------------------------------------------------------
export const weightLibrary = pgTable("weight_library", {
  id: uuid("id").primaryKey().defaultRandom(),
  searchTerm: text("search_term").notNull().unique(), // e.g. "jeans"
  category: text("category").notNull(), // e.g. "clothing"
  suggestedWeightG: integer("suggested_weight_g").notNull(),
  isVerified: boolean("is_verified").default(false).notNull(), // distinguish official vs user data
});

// -----------------------------------------------------------------------------
// 2. Packing Lists (The Trip/Container)
// -----------------------------------------------------------------------------
export const packingLists = pgTable("packing_lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(), // e.g. "Tokyo 2026"
  maxWeightG: integer("max_weight_g").notNull(), // e.g. 7000 (7kg)
  maxDimensions: text("max_dimensions"), // e.g. "55x40x20"
  bagWeightG: integer("bag_weight_g").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations so you can easily fetch a List WITH its Items
export const packingListsRelations = relations(packingLists, ({ many }) => ({
  items: many(listItems),
}));

// -----------------------------------------------------------------------------
// 3. List Items (The specific items in a bag)
// -----------------------------------------------------------------------------
export const listItems = pgTable("list_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  listId: uuid("list_id")
    .references(() => packingLists.id, { onDelete: "cascade" }) // cascading delete is cleaner for MVP
    .notNull(),
  name: text("name").notNull(),
  category: text("category").default("general").notNull(),
  weightG: integer("weight_g").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  isWorn: boolean("is_worn").default(false).notNull(), // The "Weight Shifter" logic
  isEstimated: boolean("is_estimated").default(false).notNull(), // UI Feedback
});

export const listItemsRelations = relations(listItems, ({ one }) => ({
  packingList: one(packingLists, {
    fields: [listItems.listId],
    references: [packingLists.id],
  }),
}));
