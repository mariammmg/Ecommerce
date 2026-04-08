
'use server'
import { getTokenFn } from "@/utlities/getTokenFun";


interface ShippingAddress {
    "city": string;
    "details": string;
    "phone": string;
}
export async function cashPayment(id:string,shippingAddress:ShippingAddress){
    const token = await getTokenFn();
    if (!token) {
        throw new Error("User unauthorized");
    }
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        method: "post",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      },
    );
if (!data.ok) {
    throw new Error("Payment failed");
  }
  const payload = await data.json();
  //console.log("Payment payload", payload);
  return payload;
}