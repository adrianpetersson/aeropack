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
					<ItemCard key={item.id} item={item} />
				))}
			</ScrollArea>
		</div>
	);
};
