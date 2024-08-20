CREATE TABLE IF NOT EXISTS "users" (
	"_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL
);
