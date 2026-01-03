import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { ListItems } from "@/db/types";
import { Down } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { UpdateItemForm } from "./UpdateItemForm";
import { ItemIcon } from "./ItemIcon";

export const ItemCard = ({
  item,
  editingMode,
  itemsToDelete,
  setItemsToDelete,
}: {
  item: ListItems;
  itemsToDelete: string[];
  editingMode: boolean;
  setItemsToDelete: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleItemSelection = (itemId: string) => {
    setItemsToDelete((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="group flex items-center justify-between gap-4 p-4 bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-all"
    >
      {editingMode && (
        <Checkbox
          checked={itemsToDelete.includes(item.id)}
          onCheckedChange={() => toggleItemSelection(item.id)}
          className="mr-4 border-destructive data-[state=checked]:bg-destructive"
        />
      )}
      <div className={`md:block ${expanded ? "hidden" : ""}`}>
        <ItemIcon category={item.category} />
      </div>
      <div className="grow flex items-center gap-4 ">
        {expanded ? (
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <UpdateItemForm
              onCancel={() => setExpanded(!expanded)}
              item={item}
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-900">
                {item.name}
              </h4>
              {item.isWorn && <Badge variant="secondary">Worn</Badge>}
            </div>

            <p className="text-xs text-slate-400 capitalize">{item.category}</p>
          </div>
        )}
      </div>
      {!expanded && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-sm font-mono font-bold text-slate-700">
                {item.weightG}g
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Item"}
            </p>
          </div>
          <HugeiconsIcon
            icon={Down}
            className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      )}
    </div>
  );
};
