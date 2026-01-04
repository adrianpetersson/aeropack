"use server";

import { generateText, Output } from "ai";
import { z } from "zod";
import { geminiFlash } from "@/lib/ai";

type EstimateResult =
	| { success: true; data: Record<string, number> }
	| { success: false; error: string };

export async function estimateWeightsAction(
	items: { id: string; name: string }[],
): Promise<EstimateResult> {
	if (items.length === 0) {
		return { success: true, data: {} };
	}

	try {
		const { output } = await generateText({
			model: geminiFlash,
			system:
				"You are an expert in travel gear and ultralight packing. Provide realistic weight estimates in grams for common travel items. Consider typical sizes and materials.",
			prompt: `Estimate weights for these travel items. Return the EXACT id provided for each item:

${items
	.map((item, idx) => `${idx + 1}. "${item.name}" (id: ${item.id})`)
	.join("\n")}`,
			output: Output.object({
				schema: z.object({
					estimates: z.array(
						z.object({
							id: z.string().describe("The exact id provided"),
							weightG: z
								.number()
								.int()
								.min(1)
								.max(50000)
								.describe("Estimated weight in grams"),
						}),
					),
				}),
			}),
		});

		// Convert array to map
		const estimateMap: Record<string, number> = {};

		for (const item of items) {
			const estimate = output.estimates.find((e) => e.id === item.id);
			if (estimate) {
				estimateMap[item.id] = estimate.weightG;
			} else {
				console.warn(`Missing estimate for item: ${item.name} (${item.id})`);
				estimateMap[item.id] = 200; // Default 200g for missing items
			}
		}

		console.log("AI Weight Estimates:", output.estimates);

		return { success: true, data: estimateMap };
	} catch (error) {
		console.error("AI estimation error:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to generate estimates",
		};
	}
}
