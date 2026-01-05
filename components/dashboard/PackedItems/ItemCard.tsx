"use client";
import { Down, PenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import type { ListItems } from "@/db/types";
import { ItemIcon } from "./ItemIcon";
import { UpdateItemForm } from "./UpdateItemForm";

interface ItemCardV2Props {
	item: ListItems;
}

export const ItemCard = ({ item }: ItemCardV2Props) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<article
			className={`group flex flex-col gap-4 border-b p-4 transition-all duration-200 ${
				expanded
					? "bg-blue-50/50 shadow-sm"
					: "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
			}`}
		>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-4">
					<ItemIcon category={item.category} />
					<div className="flex flex-col">
						<h4 className="font-semibold text-slate-900 text-sm capitalize">
							{item.name}
						</h4>
						<span className="text-slate-400 text-xs capitalize">
							{item.category}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex flex-col text-right">
						<data value={item.weightG} className="font-bold font-mono text-sm">
							{item.weightG}g
						</data>
						<data
							value={item.quantity}
							className="font-medium text-slate-400 text-tiny"
						>
							{item.quantity > 1 ? `Qty: ${item.quantity}` : "Single Item"}
						</data>
					</div>
					<button
						onClick={() => setExpanded(!expanded)}
						className={`rounded-lg p-2 transition-all duration-200 ${
							expanded
								? "bg-blue-100 text-blue-600"
								: "text-slate-400 opacity-100 hover:bg-slate-100 hover:text-slate-600 lg:opacity-0 lg:group-hover:opacity-100"
						}`}
						type="button"
						aria-expanded={expanded}
						aria-label={expanded ? "Close edit form" : "Edit item"}
					>
						<HugeiconsIcon
							icon={expanded ? Down : PenIcon}
							className={`h-4 w-4 transition-transform duration-200 ${
								expanded ? "rotate-180" : ""
							}`}
						/>
					</button>
				</div>
			</div>
			{expanded && (
				<section
					className="fade-in slide-in-from-top-2 w-full animate-in duration-200"
					aria-label="Edit item form"
				>
					<UpdateItemForm
						listId={item.listId}
						onSuccess={() => setExpanded(false)}
						onCancel={() => setExpanded(false)}
						item={item}
					/>
				</section>
			)}
		</article>
	);
};
