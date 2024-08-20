import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user) return user[0];
    else return null;
  } catch (error) {
    console.log("Database error: Error finding user by email ");
    return null;
  }
}

export async function insertUser(email: string) {
  try {
    const user = await db
      .insert(usersTable)
      .values({ email: email })
      .returning();
    return user[0];
  } catch (error) {
    console.log("Database error: Error inserting user");
    return null;
  }
}
