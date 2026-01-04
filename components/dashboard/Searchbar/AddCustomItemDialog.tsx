"use client";

import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import { UpdateItemForm } from "../PackedItems/UpdateItemForm";

export function AddCustomItemDialog({
	listId,
	initialName,
}: {
	listId: string;
	initialName?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button variant="outline" size="sm">
					<HugeiconsIcon icon={Plus} className="w-4 h-4 mr-2" /> Add Custom
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Custom Gear</DialogTitle>
				</DialogHeader>
				<div className="pt-4">
					<UpdateItemForm
						listId={listId}
						initialName={initialName}
						onSuccess={() => setOpen(false)}
						onCancel={() => setOpen(false)}
						variant="create"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
