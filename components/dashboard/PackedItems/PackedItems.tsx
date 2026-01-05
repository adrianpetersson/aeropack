"use client";

import { useMemo, useState } from "react";
import type { PackingListWithItems } from "@/db/types";
import { ScrollArea } from "../../ui/scroll-area";
import { Searchbar } from "../Searchbar/Searchbar";
import { ItemCard } from "./ItemCard";
import { SortingDialog } from "./SortButton";

export type SortBy = "name" | "weight" | "category";

export const PackedItems = ({
	packingList,
}: {
	packingList: PackingListWithItems;
}) => {
	const [sortBy, setSortBy] = useState<SortBy>("name");

	const sortedItems = useMemo(
		() =>
			[...packingList.items].sort((a, b) =>
				sortBy === "weight"
					? b.weightG - a.weightG
					: sortBy === "category"
						? a.category.localeCompare(b.category)
						: a.name.localeCompare(b.name),
			),
		[packingList.items, sortBy],
	);

	return (
		<div className="grid gap-4">
			<div className="flex-col items-center justify-between">
				<div className="relative flex w-full items-start">
					<Searchbar listId={packingList.id} />
					<SortingDialog sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			</div>
			<ScrollArea className="max-h-150 rounded-md border">
				{sortedItems.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</ScrollArea>
		</div>
	);
};
