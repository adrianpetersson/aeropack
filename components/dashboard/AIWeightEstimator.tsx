"use client";

import { AiMagicIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { estimateWeightsAction } from "@/actions/ai-estimation";
import { updateItemAction } from "@/actions/items";
import type { PackingListWithItems } from "@/db/types";
import { Button } from "../ui/button";

interface AIWeightEstimatorProps {
	packingList: PackingListWithItems;
}

export function AIWeightEstimator({ packingList }: AIWeightEstimatorProps) {
	const queryClient = useQueryClient();
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	const notEstimatedItemsCount = packingList.items.filter(
		(item) => !item.isEstimated,
	).length;

	if (notEstimatedItemsCount === 0) {
		return null;
	}

	const handleAIAnalysis = async () => {
		const itemsToEstimate = packingList.items.filter(
			(item) => !item.isEstimated,
		);

		setIsAnalyzing(true);
		toast.loading(`Analyzing ${itemsToEstimate.length} items...`, {
			id: "ai-analysis",
		});

		try {
			const result = await estimateWeightsAction(
				itemsToEstimate.map((item) => ({ id: item.id, name: item.name })),
			);

			if (!result.success) {
				throw new Error(result.error);
			}

			// Update each item with estimated weight
			const updatePromises = itemsToEstimate.map((item) => {
				const estimatedWeight = result.data[item.id];
				if (estimatedWeight) {
					return updateItemAction({
						id: item.id,
						listId: packingList.id,
						name: item.name,
						category: item.category,
						quantity: item.quantity,
						weightG: estimatedWeight,
						isEstimated: true,
					});
				}
				return null;
			});

			await Promise.all(updatePromises.filter(Boolean));

			queryClient.invalidateQueries({ queryKey: ["trip", packingList.id] });

			toast.success(`✨ ${itemsToEstimate.length} items analyzed!`, {
				id: "ai-analysis",
				description: "Weights have been estimated using AI",
			});
		} catch (error) {
			console.error("AI Analysis Error:", error);
			toast.error("Failed to analyze items", {
				id: "ai-analysis",
				description:
					error instanceof Error ? error.message : "Please try again",
			});
		} finally {
			setIsAnalyzing(false);
		}
	};

	return (
		<div className="relative overflow-hidden rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
			<div className="absolute inset-0 bg-[size:20px_20px] bg-grid-slate-900/[0.04]" />
			<div className="relative flex items-center justify-between gap-4 p-4">
				<div className="flex-1">
					<div className="mb-1 flex items-center gap-2">
						<span className="text-2xl">✨</span>
						<h3 className="font-semibold text-purple-900 dark:text-purple-100">
							AI Gear Analysis
						</h3>
					</div>
					<p className="text-purple-700 text-sm dark:text-purple-300">
						{notEstimatedItemsCount} item
						{notEstimatedItemsCount !== 1 ? "s" : ""} ready for AI weight
						estimation
					</p>
				</div>
				<Button onClick={handleAIAnalysis} disabled={isAnalyzing} size="lg">
					AI Weight Analysis <HugeiconsIcon icon={AiMagicIcon} />
				</Button>
			</div>
		</div>
	);
}
