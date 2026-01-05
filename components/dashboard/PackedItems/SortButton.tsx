"use client";

import { Sorting01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
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
	//TODO: revisit this, in shadcn example it seems like item selects closes the menu automatically
	const [open, setOpen] = useState(false);
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
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
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={sortBy}
					onValueChange={(value) => {
						setSortBy(value);
						setOpen(false);
					}}
				>
					<DropdownMenuRadioItem value="name">
						Name (default)
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="weight">Weight</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="category">
						Category
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
