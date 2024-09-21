import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export default db = drizzle(sql);
