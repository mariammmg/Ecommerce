'use server'
import { getTokenFn } from "@/utlities/getTokenFun";


export async function addWish(productId: string){
    const token= await getTokenFn();
    if(!token){
        throw new Error('User not authorized');
    }
    try{
        if(token){
            const data = await fetch(
              `https://ecommerce.routemisr.com/api/v1/wishlist`,
              {
                method: "post",
                body: JSON.stringify({ productId }),
                headers: {
                  token,
                  "Content-Type": "application/json",
                },
              },
            );
            const payload = await data.json();
           // console.log("Wishlist", payload);
            return payload.message;

        }

    }catch(error){
        throw new Error('Failed to add product to wishlist');

    }

    
    
}