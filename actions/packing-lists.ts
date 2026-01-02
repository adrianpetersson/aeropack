"use server";

import { db } from "@/db/db";
import { packingLists } from "@/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export async function getPackingListsAction(id: string) {
  const result = await db.query.packingLists.findFirst({
    where: eq(packingLists.id, id),
    with: {
      items: true,
    },
  });

  return result;
}
