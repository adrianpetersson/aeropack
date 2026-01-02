import { ListItems } from "@/db/types";
import {
  Delete,
  Laptop,
  Clothes,
  BodySoapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

const getIcon = (category: string) => {
  switch (category) {
    case "tech":
      return Laptop;
    case "clothing":
      return Clothes;
    case "toiletries":
      return BodySoapIcon;
    default:
      return Laptop;
  }
};

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
  const toggleItemSelection = (itemId: string) => {
    setItemsToDelete((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  return (
    <div className="group flex items-center justify-between p-4 bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-all">
      {editingMode && (
        <Checkbox
          checked={itemsToDelete.includes(item.id)}
          onCheckedChange={() => toggleItemSelection(item.id)}
          className="mr-4 border-destructive data-[state=checked]:bg-destructive"
        />
      )}
      <div className="grow flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <HugeiconsIcon icon={getIcon(item.category)} size={20} />
        </div>

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

      <div className="flex ">
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-sm font-mono font-bold text-slate-700">
              {item.weightG}g
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            {item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Unit"}
          </p>
        </div>

        {/* <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-destructive transition-all">
          <HugeiconsIcon icon={Delete} size={18} />
        </button> */}
      </div>
    </div>
  );
};
