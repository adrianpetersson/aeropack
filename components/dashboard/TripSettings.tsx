"use client";
import { useRouter } from "@bprogress/next/app";
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PackingListWithItems } from "@/db/types";
import { signOut, useSession } from "@/lib/auth-client";
import { DeletePackingListDialog } from "./DeletePackingListDialog";

export function TripSettings({ trip }: { trip: PackingListWithItems }) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();

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
							disabled={!session?.user}
							onClick={() =>
								signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/");
										},
									},
								})
							}
						>
							Sign out
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							disabled={!session?.user}
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
