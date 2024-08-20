import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log("email: ", email);
  try {
    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.email, email))
      .returning();

    return Response.json(deletedUser[0]);
  } catch (error) {
    console.log("Error deleting user from database");
    return Response.json({ message: "Error deleting a user from  database" });
  }
}
