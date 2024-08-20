"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { data: session, update, status } = useSession();
  const [admin, setAdmin] = useState(session?.user.isAdmin as boolean);
  console.log("this is for Admin?", session?.user.isAdmin);

  useEffect(() => {
    setAdmin(session?.user.isAdmin as boolean);
  }, [session]);

  const becomeAdmin = async () => {
    try {
      const response = await fetch("/api/upgrade-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user.email }),
      });

      if (response) {
        await update({});
        setAdmin(true);
      }
    } catch (error) {
      console.log("Error while upgrading to admin");
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user.email }),
      });

      signOut();
    } catch (error) {
      console.log(
        "Delete-user api had to deal with some problems while deleting the user"
      );
    }
  };

  const logSession = () => {
    console.log(session?.user);
  };

  if (status === "loading") return <p>Loading...</p>;

  if (session?.user) {
    return (
      <>
        You are a verified user.
        <br />
        {/* Admin: {admin !== undefined
          ? admin
            ? "Yes"
            : "No"
          : "Checking..."}{" "} */}
        Admin: {admin ? "YES" : "NO"}
        <br />
        <button onClick={becomeAdmin}>Become an admin</button>
        <br />
        <button onClick={logSession}>Log Session</button>
        {/* <br /> */}
        <button
          className="bg-red-500 w-fit p-1 text-black rounded-md"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        <br />
        <button onClick={deleteUser}>Delete your account</button>
      </>
    );
  } else {
    return (
      <>
        You are not logged in.
        <br />
        <button onClick={() => signIn("github")}>Sign In</button>
      </>
    );
  }
}
