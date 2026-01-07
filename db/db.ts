import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./auth-schema";
import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL ?? "");

export const db = drizzle(sql, { schema: { ...schema, ...authSchema } });
