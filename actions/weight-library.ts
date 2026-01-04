"use server";

import { ilike, or } from "drizzle-orm";
import { db } from "@/db/db";
import { weightLibrary } from "@/db/schema";

export async function searchWeightLibraryAction(searchTerm: string) {
	if (!searchTerm || searchTerm.length < 2) return [];

	const results = await db.query.weightLibrary.findMany({
		where: or(
			ilike(weightLibrary.searchTerm, `%${searchTerm}%`),
			ilike(weightLibrary.category, `%${searchTerm}%`),
		),
		limit: 10,
	});

	return results;
}
