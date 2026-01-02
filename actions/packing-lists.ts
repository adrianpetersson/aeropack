"use server";

import { db } from "@/db/db";
import { packingLists } from "@/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPackingListsAction(id: string) {
  const result = await db.query.packingLists.findFirst({
    where: eq(packingLists.id, id),
    with: {
      items: true,
    },
  });

  return result;
}

export async function createPackingListAction(title: string) {
  if (!title || title.trim().length === 0) {
    throw new Error("Trip title is required");
  }

  let newListId: string;

  try {
    const result = await db
      .insert(packingLists)
      .values({
        title: title.trim(),
        maxWeightG: 7000, // Standard 7kg carry-on limit
      })
      .returning({ id: packingLists.id });

    newListId = result[0].id;
  } catch (error) {
    console.error("Failed to create list:", error);
    throw new Error("Database insertion failed");
  }

  revalidatePath("/");

  redirect(`/trips/${newListId}`);
}
