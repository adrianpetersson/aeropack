"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUserPackingListsAction } from "@/actions/packing-lists";
import notFound from "@/app/not-found";
import { useSession } from "@/lib/auth-client";
import {
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../ui/sidebar";

export const UserPackingLists = () => {
	const { data: session } = useSession();

	const { data: trips, isLoading } = useQuery({
		queryKey: ["user-packing-lists"],
		queryFn: () => getUserPackingListsAction(),
		staleTime: 5 * 60 * 1000,
		enabled: !!session?.user,
	});

	if (!session?.user) return null;

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
