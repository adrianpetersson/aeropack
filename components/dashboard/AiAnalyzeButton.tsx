"use client";
import { AiMagicFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { estimateWeightsAction } from "@/actions/ai-estimation";
import type { PackingListWithItems } from "@/db/types";
import { Button } from "../ui/button";

interface AiAnalyzeButtonProps {
	packingList: PackingListWithItems;
}

export const AiAnalyzeButton = ({ packingList }: AiAnalyzeButtonProps) => {
	const itemsToEstimate = useMemo(
		() => packingList.items.filter((item) => !item.isEstimated),
		[packingList.items],
	);

	const queryClient = useQueryClient();

	const { mutateAsync: estimateWeightsAsync, status } = useMutation({
		mutationFn: estimateWeightsAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trip", packingList.id] });
		},
	});

	const handleAIAnalysis = async () => {
		if (itemsToEstimate.length === 0) return;
		const estimationPromise = estimateWeightsAsync(
			itemsToEstimate.map((item) => ({ id: item.id, name: item.name })),
		);

		toast.promise(estimationPromise, {
			loading: "Analyzing packing list...",
			success: "Packing list analyzed successfully!",
			error: "Failed to analyze your packing list. Please try again.",
		});
	};

	return (
		<Button
			disabled={itemsToEstimate.length === 0 || status === "pending"}
			onClick={handleAIAnalysis}
			size="lg"
			className="group relative w-full bg-blue-600 transition-all hover:bg-blue-700 hover:shadow-lg md:w-auto"
		>
			<span className="flex items-center gap-2">
				Analyze Packing List
				<HugeiconsIcon
					icon={AiMagicFreeIcons}
					className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
				/>
			</span>
		</Button>
	);
};
