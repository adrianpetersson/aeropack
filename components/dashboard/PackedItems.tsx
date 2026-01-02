"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ItemCard } from "./ItemCard";
import { PackingListWithItems } from "@/db/types";
import { Delete02Icon, Luggage } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteItemsAction } from "@/actions/items";
import { toast } from "sonner";

export const PackedItems = ({
  packingList,
}: {
  packingList: PackingListWithItems;
}) => {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => bulkDeleteItemsAction(itemsToDelete, packingList.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", packingList.id] });
      toast.success(`${itemsToDelete.length} items deleted from your trip!`);
      setItemsToDelete([]);
    },
    onError: () => {
      toast.error("Failed to delete items. Please try again.");
    },
  });

  const handleBulkDelete = () => {
    if (itemsToDelete.length === 0) return;
    mutate();
  };

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Packed Gear</h2>
        <Button onClick={() => setEdit(!edit)}>
          {edit ? "Done" : "Edit"} <HugeiconsIcon icon={Luggage} size={18} />
        </Button>
      </div>
      <ScrollArea className="max-h-150 border rounded-md">
        {packingList.items.map((item) => (
          <ItemCard
            itemsToDelete={itemsToDelete}
            setItemsToDelete={setItemsToDelete}
            editingMode={edit}
            key={item.id}
            item={item}
          />
        ))}
      </ScrollArea>
      {edit && itemsToDelete.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-900 text-white rounded-full p-2 pl-6 flex items-center justify-between shadow-2xl border border-white/10">
            <span className="text-sm font-medium">
              {itemsToDelete.length}{" "}
              {itemsToDelete.length === 1 ? "item" : "items"} selected
            </span>

            <Button
              disabled={isPending}
              variant="destructive"
              size="sm"
              className="rounded-full"
              onClick={handleBulkDelete}
            >
              <HugeiconsIcon icon={Delete02Icon} className="mr-2" size={16} />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
