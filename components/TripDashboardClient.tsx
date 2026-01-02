"use client";

import { Header } from "./dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ItemCard } from "./dashboard/ItemCard";
import { gramsToKg } from "@/utils/format.utils";
import { Searchbar } from "./dashboard/Searchbar/Searchbar";
import { useQuery } from "@tanstack/react-query";
import { getPackingListsAction } from "@/actions/packing-lists";

export default function TripDashboardClient({ id }: { id: string }) {
  const { data: trip } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => getPackingListsAction(id),
  });

  if (!trip) {
    return <div>Loading...</div>;
  }
  const packedItemsWeight = trip.items
    .filter((item) => !item.isWorn)
    .reduce((acc, item) => acc + item.weightG * item.quantity, 0);

  const totalWeight = packedItemsWeight + trip.bagWeightG;
  const limit = trip.maxWeightG;
  const percentage = Math.min((totalWeight / limit) * 100, 100);

  // 2. Determine color based on weight limit
  const isOverLimit = totalWeight > limit;

  return (
    <div className="space-y-8 border p-6 rounded-lg bg-white">
      <Header itemsCount={trip.items.length} limit={limit} />

      <Card>
        <CardHeader>
          <CardTitle>Weight Summary</CardTitle>
          <Badge>{isOverLimit ? "⚠️ OVER LIMIT" : "✅ Within Limits"}</Badge>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-black">
            {gramsToKg(totalWeight, false)}
          </span>
          <span className="text-xl ml-1 text-muted-foreground">
            / {gramsToKg(limit)} limit
          </span>
          <Progress value={percentage} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add Gear</h2>
        <Searchbar listId={trip.id} />
      </div>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Packed Gear</h2>

        {trip.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
