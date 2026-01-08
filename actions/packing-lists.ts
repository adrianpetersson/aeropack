"use server";

import { eq } from "drizzle-orm/sql/expressions/conditions";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { packingLists } from "@/db/schema";
import type { PackingListWithItems } from "@/db/types";
import { auth } from "@/lib/auth";
import { generateSlug } from "@/utils/format.utils";

export async function getPackingListsAction(id: string) {
	const result = await db.query.packingLists.findFirst({
		where: eq(packingLists.id, id),
		with: {
			items: true,
		},
	});

	return result;
}

export async function getUserPackingListsAction() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		throw new Error("User must be logged in to fetch packing lists");
	}

	const results = await db.query.packingLists.findMany({
		where: eq(packingLists.userId, session.user.id),
		orderBy: (packingLists, { desc }) => [desc(packingLists.createdAt)],
	});

	return results;
}

export async function createPackingListAction(title: string) {
	if (!title || title.trim().length === 0) {
		throw new Error("Trip title is required");
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		throw new Error("User must be logged in to create a packing list");
	}

	let newListId: string;

	try {
		const result = await db
			.insert(packingLists)
			.values({
				userId: session.user.id,
				title: title.trim(),
				slug: generateSlug(title),
				//TODO: get user max weight preference
				maxWeightG: 7000,
			})
			.returning({ id: packingLists.id });

		newListId = result[0].id;
	} catch (error) {
		console.error("Failed to create list:", error);
		throw new Error("Database insertion failed");
	}

	revalidatePath("/");

	redirect(`/trips/${newListId}`);
}

export async function deletePackingListAction(id: PackingListWithItems["id"]) {
	try {
		await db.delete(packingLists).where(eq(packingLists.id, id));
	} catch (error) {
		console.error("Failed to delete list:", error);
		throw new Error("Database deletion failed");
	}
}
