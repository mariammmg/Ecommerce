import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";


export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials login!!",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {},
      },
      authorize: async (credentials) => {
        const data = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        const userData = await data.json();
        console.log("payload", userData);
        const tokenData = jwtDecode<{ id: string }>(userData.token);
        const { name, email } = userData.user;
        return {
          id: tokenData.id,
          email,
          name,
          token: userData.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }

      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.name = token.name!;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};