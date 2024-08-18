import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { getUserByEmail, insertUser } from "./lib/dbOperations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      async profile(profile) {
        const user = await getUserByEmail(profile.email!);

        if (user?._id) {
          return {
            _id: user._id,
            name: profile.name,
            email: user.email,
            image: profile.avatar_url,
            isAdmin: user.isAdmin,
          };
        } else {
          const user = await insertUser(profile.email!);
          return {
            _id: user?._id,
            name: profile.name,
            email: profile.email,
            image: profile.avatar_url,
            isAdmin: user?.isAdmin,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token._id = user.id;
        token.isAdmin = user.isAdmin;
      }

      if (trigger === "update") {
        token.isAdmin = true;
      }

      return token;
    },

    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
});
