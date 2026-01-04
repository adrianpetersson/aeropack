"use server";

import { and, eq, inArray } from "drizzle-orm/sql/expressions/conditions";
import { sql } from "drizzle-orm/sql/sql";
import { revalidatePath } from "next/cache";
import { db } from "@/db/db";
import { listItems } from "@/db/schema";
import type { ListItems } from "@/db/types";

export async function addItemToListAction(
	item: Omit<ListItems, "id" | "isWorn">,
) {
	await db
		.insert(listItems)
		.values({
			listId: item.listId,
			name: item.name,
			weightG: item.weightG,
			category: item.category,
			isEstimated: item.isEstimated,
		})
		.onConflictDoUpdate({
			target: [listItems.listId, listItems.name],
			set: {
				quantity: sql`${listItems.quantity} + 1`,
			},
		});

	revalidatePath(`/trips/${item.listId}`);
}

export async function updateItemAction(item: Omit<ListItems, "isWorn">) {
	await db
		.update(listItems)
		.set({
			name: item.name,
			category: item.category,
			quantity: item.quantity,
			weightG: item.weightG,
		})
		.where(and(eq(listItems.id, item.id), eq(listItems.listId, item.listId)));

	revalidatePath(`/trips/${item.listId}`);
}

export async function bulkDeleteItemsAction({
	ids,
	listId,
}: {
	ids: ListItems["id"][];
	listId: string;
}) {
	await db
		.delete(listItems)
		.where(and(eq(listItems.listId, listId), inArray(listItems.id, ids)));

	revalidatePath(`/trips/${listId}`);
}
