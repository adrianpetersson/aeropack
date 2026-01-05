import { useRouter } from "@bprogress/next/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePackingListAction } from "@/actions/packing-lists";
import type { PackingListWithItems } from "@/db/types";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface DeleteTripDialogProps {
	showDeleteDialog: boolean;
	setShowDeleteDialog: (open: boolean) => void;
	packingListId: PackingListWithItems["id"];
}

export const DeletePackingListDialog = ({
	showDeleteDialog,
	setShowDeleteDialog,
	packingListId,
}: DeleteTripDialogProps) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: deletePackingList } = useMutation({
		mutationFn: () => deletePackingListAction(packingListId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["packingLists"] });
			toast.success("Trip deleted successfully!");
			router.push("/");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Failed to delete your trip. Please try again.");
		},
	});

	return (
		<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
			<DialogContent className="sm:max-w-106.25">
				<DialogHeader>
					<DialogTitle>Delete Trip?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this trip? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant="outline">Cancel</Button>} />
					<Button onClick={() => deletePackingList()} variant="destructive">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
