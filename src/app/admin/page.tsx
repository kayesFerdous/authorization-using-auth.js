import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Admin() {

  const session = await auth();

  if (session?.user) {
    if (!session.user.isAdmin) {
      return redirect("/");
    }
  } else {
    return redirect("/api/auth/signin");
  }

  return (
    <div>
      <p>This is the admin page</p>
    </div>
  )
} 
