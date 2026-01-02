import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListItems } from "@/db/types";
import {
  Laptop,
  Clothes,
  BodySoapIcon,
  Minus,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const toggleItemSelection = (itemId: string) => {
    setItemsToDelete((prev: string[]) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const categories = [
    { label: "Clothing", value: "clothing" },
    { label: "Toiletries", value: "toiletries" },
    { label: "Tech", value: "tech" },
    { label: "Other", value: "other" },
  ];
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="group flex items-center justify-between p-4 bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-all"
    >
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
            {expanded ? (
              <>
                <Field>
                  <FieldLabel
                    className="text-[10px] font-bold tracking-wider text-slate-400"
                    htmlFor="ItemName"
                  >
                    ITEM NAME
                  </FieldLabel>
                  <Input
                    defaultValue={item.name}
                    className="h-8 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </Field>
                <Field>
                  <FieldLabel
                    className="text-[10px] font-bold tracking-wider text-slate-400"
                    htmlFor="ItemCategory"
                  >
                    CATEGORY
                  </FieldLabel>
                  <Select items={categories} defaultValue={item.category}>
                    <SelectTrigger id="ItemCategory">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </>
            ) : (
              <h4 className="text-sm font-semibold text-slate-900">
                {item.name}
              </h4>
            )}
            {item.isWorn && <Badge variant="secondary">Worn</Badge>}
          </div>

          {!expanded && (
            <p className="text-xs text-slate-400 capitalize">{item.category}</p>
          )}
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
      </div>

      {expanded && !editingMode && (
        <div className="px-4 pb-4 pt-0 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-4">
            {/* Edit Quantity */}
            <div className="w-32">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block text-center">
                Quantity
              </label>
              <div className="flex items-center border rounded-md h-8">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); /* Decrement */
                  }}
                  className="px-2 hover:bg-slate-100 h-full border-r"
                >
                  <HugeiconsIcon icon={Minus} size={14} />
                </button>
                <span className="flex-1 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); /* Increment */
                  }}
                  className="px-2 hover:bg-slate-100 h-full border-l"
                >
                  <HugeiconsIcon icon={Plus} size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
