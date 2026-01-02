import { ListItems } from "@/db/types";
import { Delete, Information, Laptop } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const ItemCard = ({ item }: { item: ListItems }) => {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-all">
      <div className="flex items-center gap-4">
        {/* Category Icon with a subtle "Technical" backdrop */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <HugeiconsIcon icon={Laptop} size={20} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900">
              {item.name}
            </h4>
            {item.isWorn && (
              <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                Worn
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 capitalize">{item.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Weight Information */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-sm font-mono font-bold text-slate-700">
              {item.weightG}g
            </span>
            {item.isEstimated && (
              <HugeiconsIcon
                icon={Information}
                size={14}
                className="text-amber-500"
              />
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            {item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Unit"}
          </p>
        </div>

        {/* Delete Action - Appears on hover */}
        <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-destructive transition-all">
          <HugeiconsIcon icon={Delete} size={18} />
        </button>
      </div>
    </div>
  );
};
