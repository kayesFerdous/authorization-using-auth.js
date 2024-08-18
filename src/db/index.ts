import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const POSTGRES_URL = process.env.POSTGRES_URL as string;

const queryClient = postgres(POSTGRES_URL);
export const db = drizzle(queryClient);

const migrationClient = postgres(POSTGRES_URL, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });
