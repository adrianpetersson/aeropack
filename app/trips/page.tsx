import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserPackingListsAction } from "@/actions/packing-lists";
import { UserPackingLists } from "@/components/dashboard/UserPackingLists";
import { getQueryClient } from "@/lib/get-query-client";

export default async function TripDashboardPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["user-packing-lists"],
		queryFn: () => getUserPackingListsAction(),
		staleTime: 5 * 60 * 1000,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UserPackingLists />
		</HydrationBoundary>
	);
}
