"use server";

import { db } from "@/db/db";
import { listItems } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm/sql/expressions/conditions";
import { sql } from "drizzle-orm/sql/sql";
import { revalidatePath } from "next/cache";

export async function addItemToListAction(data: {
  listId: string;
  name: string;
  weightG: number;
  category: string;
}) {
  await db
    .insert(listItems)
    .values({
      listId: data.listId,
      name: data.name,
      weightG: data.weightG,
      category: data.category,
      isEstimated: true, // Since it's coming from the library
    })
    .onConflictDoUpdate({
      target: [listItems.listId, listItems.name],
      set: {
        quantity: sql`${listItems.quantity} + 1`,
      },
    });

  // This tells Next.js to refresh the data on the page
  revalidatePath(`/trips/${data.listId}`);
}

export async function updateItemAction(data: {
  itemId: string;
  listId: string;
  name: string;
  category: string;
  quantity: number;
  weight: number;
}) {
  await db
    .update(listItems)
    .set({
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      weightG: data.weight,
    })
    .where(
      and(eq(listItems.id, data.itemId), eq(listItems.listId, data.listId))
    );

  revalidatePath(`/trips/${data.listId}`);
}

export async function bulkDeleteItemsAction(ids: string[], listId: string) {
  await db.delete(listItems).where(
    and(
      eq(listItems.listId, listId), // Safety check: ensure they belong to this trip
      inArray(listItems.id, ids) // Delete everything in the ID list
    )
  );

  revalidatePath(`/trips/${listId}`);
}
