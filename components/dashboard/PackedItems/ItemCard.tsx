import { Down, PencilEdit01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { ListItems } from "@/db/types";
import { ItemIcon } from "./ItemIcon";
import { UpdateItemForm } from "./UpdateItemForm";

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
      className={`group flex flex-col gap-4 p-4 border-b transition-all duration-200 ${
        expanded
          ? "bg-blue-50/50 border-blue-200 shadow-sm"
          : "bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {editingMode && (
          <Checkbox
            checked={itemsToDelete.includes(item.id)}
            onCheckedChange={() => toggleItemSelection(item.id)}
            className="mr-4 border-destructive data-[state=checked]:bg-destructive"
          />
        )}
        <div className="shrink-0">
          <ItemIcon category={item.category} />
        </div>
        <div className="grow flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-900">
                {item.name}
              </h4>
              {item.isWorn && <Badge variant="secondary">Worn</Badge>}
            </div>
            <p className="text-xs text-slate-400 capitalize">{item.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-sm font-mono font-bold text-slate-700">
                {item.weightG}g
              </span>
            </div>
            <p className="text-tiny text-slate-400 font-medium">
              {item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Item"}
            </p>
          </div>
          {!editingMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                expanded
                  ? "bg-blue-100 text-blue-600"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              }`}
              aria-label={expanded ? "Close edit form" : "Edit item"}
            >
              <HugeiconsIcon
                icon={expanded ? Down : PencilEdit01FreeIcons}
                className={`w-4 h-4 transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
      {expanded && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <UpdateItemForm
            item={item}
            listId={item.listId}
            onSuccess={() => setExpanded(false)}
            onCancel={() => setExpanded(false)}
          />
        </div>
      )}
    </div>
  );
};
