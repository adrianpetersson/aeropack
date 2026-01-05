"use client";
import { Settings01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PackingListWithItems } from "@/db/types";
import { DeletePackingListDialog } from "./DeletePackingListDialog";

export function TripSettings({ trip }: { trip: PackingListWithItems }) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger
					render={
						<Button
							variant="secondary"
							className="size-6"
							aria-label="Open menu"
							size="icon-sm"
						>
							<HugeiconsIcon icon={Settings01FreeIcons} />
						</Button>
					}
				/>
				<DropdownMenuContent className="w-40" align="end">
					<DropdownMenuGroup>
						<DropdownMenuLabel>My trip</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => setShowDeleteDialog(true)}
							variant="destructive"
						>
							Delete trip
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeletePackingListDialog
				packingListId={trip.id}
				showDeleteDialog={showDeleteDialog}
				setShowDeleteDialog={setShowDeleteDialog}
			/>
		</>
	);
}
