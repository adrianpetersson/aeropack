ALTER TABLE "packing_lists" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "packing_lists" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "packing_lists" ADD CONSTRAINT "packing_lists_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packing_lists" DROP COLUMN "max_dimensions";--> statement-breakpoint
ALTER TABLE "packing_lists" ADD CONSTRAINT "packing_lists_slug_unique" UNIQUE("slug");