"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { estimateWeightsAction } from "@/actions/ai-estimation";
import { updateItemAction } from "@/actions/items";
import type { PackingListWithItems } from "@/db/types";

interface AIWeightEstimatorProps {
  packingList: PackingListWithItems;
}

export function AIWeightEstimator({ packingList }: AIWeightEstimatorProps) {
  const queryClient = useQueryClient();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const estimatedItemsCount = packingList.items.filter(
    (item) => item.isEstimated
  ).length;

  if (estimatedItemsCount === 0) {
    return null;
  }

  const handleAIAnalysis = async () => {
    const itemsToEstimate = packingList.items.filter(
      (item) => item.isEstimated
    );

    setIsAnalyzing(true);
    toast.loading(`Analyzing ${itemsToEstimate.length} items...`, {
      id: "ai-analysis",
    });

    try {
      const result = await estimateWeightsAction(
        itemsToEstimate.map((item) => ({ id: item.id, name: item.name }))
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      // Update each item with estimated weight
      const updatePromises = itemsToEstimate.map((item) => {
        const estimatedWeight = result.data[item.id];
        if (estimatedWeight) {
          return updateItemAction({
            itemId: item.id,
            listId: packingList.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity,
            weight: estimatedWeight,
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
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
      <div className="relative flex items-center justify-between gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">✨</span>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">
              AI Gear Analysis
            </h3>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            {estimatedItemsCount} item{estimatedItemsCount !== 1 ? "s" : ""}{" "}
            ready for AI weight estimation
          </p>
        </div>
        <Button
          onClick={handleAIAnalysis}
          disabled={isAnalyzing}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M12 2v4" />
                <path d="m16.2 7.8 2.9-2.9" />
                <path d="M18 12h4" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M12 18v4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="M2 12h4" />
                <path d="m4.9 4.9 2.9 2.9" />
              </svg>
              Analyze Weights
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
