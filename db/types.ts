import { InferSelectModel } from "drizzle-orm";
import { listItems, packingLists } from "./schema";

export type PackingListWithItems = InferSelectModel<typeof packingLists> & {
  items: ListItems[];
};

export type ListItems = InferSelectModel<typeof listItems>;
