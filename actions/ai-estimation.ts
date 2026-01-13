"use server";

import { generateText, Output } from "ai";
import { z } from "zod";
import type { ListItems } from "@/db/types";
import { geminiFlash } from "@/lib/ai";
import { bulkUpdateItemsAction } from "./items";

type EstimateResult =
	| {
			success: true;
			data: Partial<ListItems>[] | [];
			usage: {
				promptTokens: number;
				outputTokens: number;
				totalTokens: number;
			};
	  }
	| { success: false; error: string };

// We save tokens by using parallel arrays instead of array of objects with keys
// Example: { items: ["item1", "item2"], weights: [100, 200] }
const estimateWeightsSchema = z.object({
	names: z.array(z.string()),
	weights: z.array(z.number().int().min(1).max(7000)),
});

export async function estimateWeightsAction(
	items: { id: string; name: string }[],
): Promise<EstimateResult> {
	if (items.length === 0) {
		return {
			success: true,
			data: [],
			usage: { promptTokens: 0, outputTokens: 0, totalTokens: 0 },
		};
	}

	// send only names to minimize tokens
	const names = items.map((item) => item.name);

	try {
		const { output, usage } = await generateText({
			model: geminiFlash,
			system:
				"Estimate travel item weights in grams. Return items and weights as parallel arrays.",
			prompt: JSON.stringify(names),
			output: Output.object({ schema: estimateWeightsSchema }),
		});

		// Validate arrays match
		if (output.names.length !== names.length) {
			throw new Error("AI returned mismatched array lengths");
		}

		// Map weights by matching items to original names
		const estimateMap = new Map<string, number>();
		for (let i = 0; i < output.names.length; i++) {
			estimateMap.set(output.names[i], output.weights[i]);
		}

		const updatedItems = items.map((item) => ({
			...item,
			weightG: estimateMap.get(item.name) ?? 0, // 0 = estimation failed (we can handle this in the UI)
			isEstimated: true,
		}));

		await bulkUpdateItemsAction(updatedItems);

		return {
			success: true,
			data: updatedItems,
			usage: {
				promptTokens: usage?.inputTokens ?? 0,
				outputTokens: usage?.outputTokens ?? 0,
				totalTokens: usage?.totalTokens ?? 0,
			},
		};
	} catch (error) {
		console.error("AI estimation error:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to generate estimates",
		};
	}
}
