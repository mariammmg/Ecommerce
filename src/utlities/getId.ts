import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getid() {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const cookieStore = await cookies();
  const nextAuthCookie = cookieStore.get(cookieName)?.value;

  if (!nextAuthCookie) return null;

  const decoded = await decode({
    token: nextAuthCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // Your userId is here
  return decoded?.id || null;
}
