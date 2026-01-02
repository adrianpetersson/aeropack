/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import AddItemSearch from "./AddItemSearch";

export default function TripDashboardClient({
  initialTrip,
}: {
  initialTrip: any;
}) {
  const [trip, setTrip] = useState(initialTrip);

  // 1. Calculate Packed Weight (Exclude items marked as "isWorn")
  const packedItemsWeight = trip.items
    .filter((item: any) => !item.isWorn)
    .reduce((acc: number, item: any) => acc + item.weightG * item.quantity, 0);

  const totalWeight = packedItemsWeight + trip.bagWeightG;
  const limit = trip.maxWeightG;
  const percentage = Math.min((totalWeight / limit) * 100, 100);

  // 2. Determine color based on weight limit
  const isOverLimit = totalWeight > limit;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section>
        <h1 className="text-3xl font-bold">{trip.title}</h1>
        <p className="text-muted-foreground">Limit: {limit / 1000}kg</p>
      </section>

      {/* Weight Gauge Card */}
      <div
        className={`p-6 rounded-xl border-2 ${
          isOverLimit ? "border-destructive bg-destructive/5" : "border-border"
        }`}
      >
        <div className="flex justify-between mb-4 items-end">
          <div>
            <span className="text-4xl font-black">{totalWeight / 1000}</span>
            <span className="text-xl ml-1 text-muted-foreground">
              / {limit / 1000} kg
            </span>
          </div>
          <div className="text-right text-sm">
            {isOverLimit ? "⚠️ OVER LIMIT" : "✅ Within Limits"}
          </div>
        </div>
        {/* <Progress value={percentage} className="h-4" /> */}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add Gear</h2>
        <AddItemSearch listId={trip.id} />
      </div>

      {/* Grid: Bag + Items */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Packed Gear</h2>
        {/* Loop through trip.items here to show what's inside */}
        {trip.items.map((item: any) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <span>{item.name}</span>
            <span>{item.weightG}g</span>
          </div>
        ))}
      </div>
    </div>
  );
}
