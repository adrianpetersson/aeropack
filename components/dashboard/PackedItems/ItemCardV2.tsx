"use client";
import { Down, PenIcon, Up } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import type { ListItems } from "@/db/types";
import { ItemIcon } from "./ItemIcon";
import { UpdateItemForm } from "./UpdateItemForm";

interface ItemCardV2Props {
  item: ListItems;
}

export const ItemCardV2 = ({ item }: ItemCardV2Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`group flex flex-col gap-4 p-4 border-b transition-all duration-200 ${
        expanded
          ? "bg-blue-50/50 shadow-sm"
          : "bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center gap-4">
          <ItemIcon category={item.category} />
          <div className="flex flex-col">
            <h4 className="font-bold text-sm capitalize">{item.name}</h4>
            <span className="text-xs text-slate-400 capitalize">
              {item.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="font-bold font-mono text-sm">{item.weightG}g</span>
            <span className="text-tiny text-slate-400 font-medium">
              {item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Item"}
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              expanded
                ? "bg-blue-100 text-blue-600"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 opacity-0 group-hover:opacity-100"
            }`}
            type="button"
          >
            <HugeiconsIcon
              icon={expanded ? Down : PenIcon}
              className={`w-4 h-4 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <UpdateItemForm
            listId={item.listId}
            onSuccess={() => setExpanded(false)}
            onCancel={() => setExpanded(false)}
            item={item}
          />
        </div>
      )}
    </div>
  );
};
