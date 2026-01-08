"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUserPackingListsAction } from "@/actions/packing-lists";
import notFound from "@/app/not-found";

export const UserPackingLists = () => {
	const { data: trips } = useQuery({
		queryKey: ["user-packing-lists"],
		queryFn: () => getUserPackingListsAction(),
		staleTime: 5 * 60 * 1000,
	});

	if (!trips) {
		return notFound();
	}
	return (
		<div>
			{trips.map((trip) => (
				<Link href={`/trips/${trip.id}`} key={trip.id}>
					<h2>{trip.title}</h2>
					<p>Max Weight: {trip.maxWeightG} g</p>
				</Link>
			))}
		</div>
	);
};
