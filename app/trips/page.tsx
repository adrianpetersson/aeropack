import { redirect } from "next/navigation";
import { getUserPackingListsAction } from "@/actions/packing-lists";

export default async function TripDashboardPage() {
	const packingLists = await getUserPackingListsAction();

	if (packingLists.length > 0) {
		redirect(`/trips/${packingLists[0].id}`);
	}

	return <div>No packing lists found. Create your first one!</div>;
}
