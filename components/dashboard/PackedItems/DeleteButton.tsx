"use client";

import { bulkDeleteItemsAction } from "@/actions/items";
import { Button } from "../../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";

interface DeleteButtonProps {
  itemsToDelete: string[];
  setItemsToDelete: (ids: string[]) => void;
  packingListId: string;
}

export const DeleteButton = ({
  itemsToDelete,
  setItemsToDelete,
  packingListId,
}: DeleteButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => bulkDeleteItemsAction(itemsToDelete, packingListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", packingListId] });
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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-slate-900 text-white rounded-full p-2 pl-6 flex items-center justify-between shadow-2xl border border-white/10">
        <span className="text-sm font-medium">
          {itemsToDelete.length} {itemsToDelete.length === 1 ? "item" : "items"}{" "}
          selected
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
  );
};
