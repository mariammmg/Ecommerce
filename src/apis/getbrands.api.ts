export interface Brandinterface {
  name: string;
  image: string;
  _id: string;
}

export async function getBrands(): Promise<Brandinterface[] | null> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    const payload = await response.json();

    return payload?.data;
  } catch (error) {
    return null;
  }
}
