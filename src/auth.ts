import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@/db";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("Missing google credentials");
}

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const user = await db.user.findUnique({
        where: { email: session.user.email },
      }) as any;
      if (session && user) {
        session.user.id = user.id;
      }

      return session;
    },
    async signIn({ profile }) {
      if (profile) {
        try {
          const userExists = await db.user.findUnique({
            where: { email: profile.email! },
          });

          if (!userExists) {
            await db.user.create({
              data: {
                email: profile.email!,
                name: profile.name!,
                image: profile.picture,
              },
            });
          }

          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      } else {
        return false;
      }
    },
  },
});
