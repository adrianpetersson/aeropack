"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUserPackingListsAction } from "@/actions/packing-lists";
import notFound from "@/app/not-found";
import { Card, CardContent, CardHeader } from "../ui/card";

export const UserPackingLists = () => {
	const { data: trips, isLoading } = useQuery({
		queryKey: ["user-packing-lists"],
		queryFn: () => getUserPackingListsAction(),
		staleTime: 5 * 60 * 1000,
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!trips && !isLoading) {
		return notFound();
	}
	return (
		<div>
			<h1 className="mb-4 font-bold text-2xl">Your Packing Lists</h1>
			<div className="space-y-4 px-4 lg:max-w-1/3">
				{trips?.map((trip) => (
					<Link key={trip.id} href={`/trips/${trip.id}`}>
						<Card>
							<CardHeader>
								<h2 className="font-semibold text-lg">{trip.title}</h2>
							</CardHeader>
							<CardContent>
								<p>Max Weight: {trip.maxWeightG} g</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
};
