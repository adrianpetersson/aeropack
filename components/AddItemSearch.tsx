"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";

import { searchWeightLibraryAction } from "@/actions/weight-library";
import { Plus, Sparkles } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { addItemToListAction } from "@/actions/items";

export default function AddItemSearch({ listId }: { listId: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const queryClient = useQueryClient();

  const { mutate: addItem, isPending: isAdding } = useMutation({
    mutationFn: addItemToListAction,
    onSuccess: () => {
      setSearchTerm(""); // Clear search on success
      // Tell TanStack Query to refetch the trip data if needed
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
    },
  });
  const { data: results, isLoading } = useQuery({
    queryKey: ["weight-library", debouncedSearch],
    queryFn: () => searchWeightLibraryAction(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
  });

  return (
    <div className="relative w-full space-y-2">
      <div className="relative">
        <Input
          placeholder="Search items (e.g. 'Jeans' or 'Laptop')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        {/* {isLoading && (
          <Loader2 className="absolute right-3 top-2.5 h-5 w-5 animate-spin text-muted-foreground" />
        )} */}
      </div>

      {/* Results Dropdown */}
      {debouncedSearch.length >= 2 && (
        <div className="absolute z-10 w-full bg-popover border rounded-md shadow-lg mt-1 overflow-hidden">
          {results?.length ? (
            results.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-3 hover:bg-accent text-sm transition-colors border-b last:border-0"
                onClick={() =>
                  addItem({
                    listId,
                    name: item.searchTerm,
                    weightG: item.suggestedWeightG,
                    category: item.category,
                  })
                }
              >
                <div className="flex flex-col text-left">
                  <span className="font-medium">{item.searchTerm}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {item.category}
                  </span>
                </div>
                <span className="text-muted-foreground font-mono">
                  {item.suggestedWeightG}g
                </span>
              </button>
            ))
          ) : !isLoading ? (
            <div className="p-4 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                No &quot;Official&quot; weight found for &quot;{debouncedSearch}
                &quot;
              </p>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="secondary">
                  <HugeiconsIcon icon={Plus} className="w-4 h-4 mr-1" /> Add
                  Custom
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  <HugeiconsIcon icon={Sparkles} className="w-4 h-4 mr-1" /> Ask
                  AI to Estimate
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
