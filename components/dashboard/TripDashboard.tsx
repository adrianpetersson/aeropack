"use client";

import { useQuery } from "@tanstack/react-query";
import { getPackingListsAction } from "@/actions/packing-lists";
import { AIWeightEstimator } from "./AIWeightEstimator";
import { Header } from "./Header";
import { PackedItems } from "./PackedItems/PackedItems";

export default function TripDashboard({ id }: { id: string }) {
	const { data: trip } = useQuery({
		queryKey: ["trip", id],
		queryFn: () => getPackingListsAction(id),
		staleTime: 5 * 60 * 1000,
	});

	if (!trip) {
		return <div>Loading...</div>;
	}

	return (
		<div className="relative space-y-4 rounded-lg p-4 md:p-6">
			<Header trip={trip} />

			<AIWeightEstimator packingList={trip} />

			<PackedItems packingList={trip} />
		</div>
	);
}
