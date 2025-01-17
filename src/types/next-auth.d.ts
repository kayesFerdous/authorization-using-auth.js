import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}
