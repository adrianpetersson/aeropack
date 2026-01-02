"use server";

import { db } from "@/db/db";
import { listItems } from "@/db/schema";
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
