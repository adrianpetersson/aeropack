import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPackingListsAction } from "@/actions/packing-lists";
import TripDashboard from "@/components/dashboard/TripDashboard";
import { getQueryClient } from "@/lib/get-query-client";

export default async function TripPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["trip", id],
		queryFn: () => getPackingListsAction(id),
		staleTime: 5 * 60 * 1000,
	});

	return (
		<main className="max-w-4xl mx-auto md:p-6">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<TripDashboard id={id} />
			</HydrationBoundary>
		</main>
	);
}
