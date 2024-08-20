import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log("email: ", email);
  try {
    const updatedUser = await db
      .update(usersTable)
      .set({ isAdmin: true })
      .where(eq(usersTable.email, email))
      .returning();

    return Response.json(updatedUser[0]);
  } catch (error) {
    console.log("Error while updating database");
    return Response.json({ message: "Error updating database" });
  }
}
