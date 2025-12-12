import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user?.email);
        if (!existingGuest) {
          await createGuest({
            email: user?.email,
            fullName: user?.name,
          });
          console.log(account, "account");
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    //     When it runs: Whenever a session is checked (client or server)
    // Purpose: Customize what data is exposed in the session object (what useSession() or auth() returns)
    async session({ session, user, token }) {
      const guest = await getGuest(session?.user?.email);
      session.user.guestId = guest?.id; //const session = await auth() => to this session now we added guestId too
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

// This callback runs on every request matched by the middleware matcher
// !!auth?.user converts the user object to a boolean:

// If user exists → true (allow access)
// If user is null/undefined → false (deny access)

// When it returns false, NextAuth automatically redirects to the sign-in page
