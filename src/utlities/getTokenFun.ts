import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getTokenFn(){
    
    const cookieName= process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token";
    const cookie= await cookies();
        const nextAuthcookie= cookie.get(cookieName)?.value;
        const decodeCookie= await decode({secret:process.env.NEXTAUTH_SECRET!,token:nextAuthcookie!});

        return decodeCookie?.token;
}