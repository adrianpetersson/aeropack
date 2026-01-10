"use client";

import { useQuery } from "@tanstack/react-query";
import { getPackingListsAction } from "@/actions/packing-lists";
import notFound from "@/app/not-found";
import { Header } from "./Header";
import { PackedItems } from "./PackedItems/PackedItems";

export default function TripDashboard({ id }: { id: string }) {
	const { data: trip } = useQuery({
		queryKey: ["trip", id],
		queryFn: () => getPackingListsAction(id),
		staleTime: 5 * 60 * 1000,
	});

	if (!trip) {
		return notFound();
	}

	return (
		<div className="relative space-y-4 rounded-lg px-4 py-4">
			<Header trip={trip} />
			<PackedItems packingList={trip} />
		</div>
	);
}
