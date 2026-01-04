"use client";

import { useQuery } from "@tanstack/react-query";
import { getPackingListsAction } from "@/actions/packing-lists";
import { gramsToKg } from "@/utils/format.utils";
import { Badge } from "../ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { AIWeightEstimator } from "./AIWeightEstimator";
import { Header } from "./Header";
import { PackedItems } from "./PackedItems/PackedItems";
import { Searchbar } from "./Searchbar/Searchbar";

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
    <div className="relative space-y-8 border md:p-6 p-4 rounded-lg bg-white">
      <Header trip={trip} />

      <AIWeightEstimator packingList={trip} />

      <PackedItems packingList={trip} />
    </div>
  );
}
