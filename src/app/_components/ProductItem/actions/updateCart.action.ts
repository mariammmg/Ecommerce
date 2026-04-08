
'use server'
import { getTokenFn } from "@/utlities/getTokenFun";


export async function UpdateCart({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const token = await getTokenFn();
  if (!token) {
    throw new Error("User not authorized");
  }
  try {
    if (token) {
      const data = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          method: "put",
          body: JSON.stringify({ count }),
          headers: {
            token,
            "Content-Type": "application/json",
          },
        },
      );
      const payload = await data.json();
     // console.log(payload);
      return payload.message;
    }
  } catch (error) {
    throw new Error("Failed to add product to cart");
  }
}