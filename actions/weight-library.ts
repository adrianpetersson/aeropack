"use server";

import { ilike, or } from "drizzle-orm";
import { db } from "@/db/db";
import { weightLibrary } from "@/db/schema";

export async function searchWeightLibraryAction(term: string) {
	if (!term || term.length < 2) return [];

	const results = await db.query.weightLibrary.findMany({
		where: or(
			ilike(weightLibrary.searchTerm, `%${term}%`),
			ilike(weightLibrary.category, `%${term}%`),
		),
		limit: 10,
	});

	return results;
}
