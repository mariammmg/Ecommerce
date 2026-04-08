import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token= await getToken({req});
    console.log('Token from handler:', token);
    if(!token){
        return NextResponse.json({error:'User not authorized',status:401});
    }
     const data = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
       headers: {
         token: token.token,
         "Content-Type": "application/json",
       },
     });
     const payload = await data.json();
     console.log("cartpayload:", payload);
     if(!data.ok)
        return NextResponse.json({ error: data.statusText, status: data.status });
    return NextResponse.json(payload);
}