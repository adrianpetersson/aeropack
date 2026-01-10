"use client";

import { useRouter } from "@bprogress/next/app";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { getUserPackingListsAction } from "@/actions/packing-lists";
import notFound from "@/app/not-found";
import {
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../ui/sidebar";

export const UserPackingLists = () => {
	const { data: trips, isLoading } = useQuery({
		queryKey: ["user-packing-lists"],
		queryFn: () => getUserPackingListsAction(),
		staleTime: 5 * 60 * 1000,
	});

	const router = useRouter();

	useEffect(() => {
		if (trips?.length) {
			router.push(`/trips/${trips[0].id}`);
		}
	}, [trips, router]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!trips && !isLoading) {
		return notFound();
	}

	return (
		<SidebarMenuSub>
			{trips?.map((trip) => (
				<SidebarMenuSubItem key={trip.id}>
					<SidebarMenuSubButton
						render={
							<Link href={`/trips/${trip.id}`} className="hover:bg-gray-100">
								{trip.title}
							</Link>
						}
					/>
				</SidebarMenuSubItem>
			))}
		</SidebarMenuSub>
	);
};
