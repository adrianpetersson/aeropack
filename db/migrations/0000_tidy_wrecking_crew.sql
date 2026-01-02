CREATE TABLE "list_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"list_id" uuid NOT NULL,
	"name" text NOT NULL,
	"category" text DEFAULT 'general' NOT NULL,
	"weight_g" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"is_worn" boolean DEFAULT false NOT NULL,
	"is_estimated" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packing_lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"max_weight_g" integer NOT NULL,
	"max_dimensions" text,
	"bag_weight_g" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weight_library" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"search_term" text NOT NULL,
	"category" text NOT NULL,
	"suggested_weight_g" integer NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "weight_library_search_term_unique" UNIQUE("search_term")
);
--> statement-breakpoint
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_list_id_packing_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."packing_lists"("id") ON DELETE cascade ON UPDATE no action;