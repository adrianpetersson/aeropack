"use client";

import { Sorting01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortBy } from "./PackedItems";

export function SortingDialog({
	setSortBy,
	sortBy,
}: {
	setSortBy: (value: SortBy) => void;
	sortBy: SortBy;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						className="size-10"
						variant="outline"
						aria-label="Open menu"
						size="icon-sm"
					>
						<HugeiconsIcon icon={Sorting01FreeIcons} />
					</Button>
				}
			/>
			<DropdownMenuContent className="w-40" align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Sort items by</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuCheckboxItem
						checked={sortBy === "name"}
						onCheckedChange={() => setSortBy("name")}
					>
						Name (default)
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={sortBy === "weight"}
						onCheckedChange={() => setSortBy("weight")}
					>
						Weight
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={sortBy === "category"}
						onCheckedChange={() => setSortBy("category")}
					>
						Category
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
