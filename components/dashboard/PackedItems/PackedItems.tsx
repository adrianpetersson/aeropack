"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";

import { PackingListWithItems } from "@/db/types";
import { Luggage } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { ItemCard } from "./ItemCard";

export const PackedItems = ({
  packingList,
}: {
  packingList: PackingListWithItems;
}) => {
  const [edit, setEdit] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

  return (
    <div className="grid gap-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Packed Gear</h2>
        <Button
          onClick={() => {
            setEdit(!edit);
            setItemsToDelete([]);
          }}
        >
          {edit ? "Close" : "Edit"} <HugeiconsIcon icon={Luggage} size={18} />
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
        <DeleteButton
          itemsToDelete={itemsToDelete}
          setItemsToDelete={setItemsToDelete}
          packingListId={packingList.id}
        />
      )}
    </div>
  );
};
