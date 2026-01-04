"use client";

import type { PackingListWithItems } from "@/db/types";
import { ScrollArea } from "../../ui/scroll-area";
import { Searchbar } from "../Searchbar/Searchbar";
import { ItemCardV2 } from "./ItemCardV2";

export const PackedItems = ({
  packingList,
}: {
  packingList: PackingListWithItems;
}) => {
  return (
    <div className="grid gap-4 ">
      <div className="flex-col justify-between items-center">
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Add Gear</h2>
          </div>
          <Searchbar listId={packingList.id} />
        </div>
      </div>
      <ScrollArea className="max-h-150 border rounded-md">
        {packingList.items.map((item) => (
          <ItemCardV2 key={item.id} item={item} />
        ))}
      </ScrollArea>
    </div>
  );
};
