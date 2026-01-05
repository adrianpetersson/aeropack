"use client";

import type { PackingListWithItems } from "@/db/types";
import { ScrollArea } from "../../ui/scroll-area";
import { Searchbar } from "../Searchbar/Searchbar";
import { ItemCard } from "./ItemCard";

export const PackedItems = ({
	packingList,
}: {
	packingList: PackingListWithItems;
}) => {
	return (
		<div className="grid gap-4">
			<div className="flex-col items-center justify-between">
				<div className="w-full">
					<div className="flex justify-between">
						<h2 className="font-semibold text-xl">Add Gear</h2>
					</div>
					<Searchbar listId={packingList.id} />
				</div>
			</div>
			<ScrollArea className="max-h-150 rounded-md border">
				{packingList.items.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</ScrollArea>
		</div>
	);
};
