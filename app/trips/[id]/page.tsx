import TripDashboardClient from "@/components/TripDashboardClient";
import { getQueryClient } from "@/lib/get-query-client";
import { getPackingListsAction } from "@/actions/packing-lists";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TripDashboardClient id={id} />
      </HydrationBoundary>
    </main>
  );
}
