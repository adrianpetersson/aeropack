"use client";

import { AddFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { createPackingListAction } from "@/actions/packing-lists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CreateTripInline = () => {
	const [tripName, setTripName] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateTrip = async () => {
		if (tripName.trim().length === 0) return;

		setIsCreating(true);
		try {
			startTransition(async () => {
				await createPackingListAction(tripName);
			});
		} catch (error) {
			console.error("Failed to create trip:", error);
			toast.error("Failed to create trip");
			setIsCreating(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleCreateTrip();
		}
	};

	return (
		<div className="flex flex-col gap-2 p-2">
			<Input
				placeholder="Where are you headed?"
				value={tripName}
				onChange={(e) => setTripName(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={isCreating}
				className="text-sm"
			/>
			<Button
				onClick={handleCreateTrip}
				disabled={tripName.trim().length === 0 || isCreating}
				size="sm"
				className="w-full"
			>
				<HugeiconsIcon icon={AddFreeIcons} className="mr-2 size-4" />
				Create New Trip
			</Button>
		</div>
	);
};
