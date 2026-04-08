import { PayProducts } from "./interfaces/payment.interface";

export async function getOrders(): Promise<PayProducts[] | null> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/orders",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const payload = await response.json();
    

    return payload?.data;
  } catch (error) {
    return null;
  }
}
