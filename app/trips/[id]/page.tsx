import { eq } from "drizzle-orm";
import { packingLists } from "@/db/schema";
import { notFound } from "next/navigation";
import TripDashboardClient from "@/components/TripDashboardClient";
import { db } from "@/db/db";

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trip = await db.query.packingLists.findFirst({
    where: eq(packingLists.id, id),
    with: {
      items: true, // This gets all the gear in the bag!
    },
  });

  if (!trip) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <TripDashboardClient initialTrip={trip} />
    </main>
  );
}
