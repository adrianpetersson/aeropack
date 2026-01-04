"use client";

import { addItemToListAction } from "@/actions/items";
import { searchWeightLibraryAction } from "@/actions/weight-library";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Sparkles } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { AddCustomItemDialog } from "./AddCustomItemDialog";

export const Searchbar = ({ listId }: { listId: string }) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: results } = useQuery({
    queryKey: ["weight-library", debouncedSearch],
    queryFn: () => searchWeightLibraryAction(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
  });

  const { mutate: addItem, isPending } = useMutation({
    mutationFn: addItemToListAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", listId] });
    },
  });

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={searchTerm}
        onValueChange={setSearchTerm}
        placeholder="Search items (e.g. 'T-shirt' or 'Macbook')..."
      />
      <CommandList>
        {results && !results.length && (
          <CommandEmpty>
            <span>No results found for {debouncedSearch}</span>
            <div className="flex mt-2 gap-2 justify-center">
              <AddCustomItemDialog
                initialName={debouncedSearch}
                listId={listId}
              />
              <Button disabled size="sm" variant="outline">
                <HugeiconsIcon icon={Sparkles} className="w-4 h-4 mr-1" /> Ask
                AI to Estimate
              </Button>
            </div>
          </CommandEmpty>
        )}
        {results && results.length > 0 && (
          <CommandGroup heading="Suggestions">
            {debouncedSearch.length >= 2 &&
              results?.map((item) => (
                <CommandItem
                  className="w-full"
                  disabled={isPending}
                  key={item.id}
                  onSelect={() => {
                    addItem({
                      listId,
                      name: item.searchTerm,
                      weightG: item.suggestedWeightG,
                      category: item.category,
                      quantity: 1,
                      isEstimated: true,
                    });
                    setSearchTerm("");
                  }}
                >
                  {item.searchTerm}
                  <span className="text-muted-foreground font-mono">
                    {item.suggestedWeightG}g
                  </span>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};
