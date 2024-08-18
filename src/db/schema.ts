import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  _id: text("_id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  isAdmin: boolean("isAdmin").default(false).notNull(),
});
