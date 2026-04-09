export interface SubCategoryinterface {
  name: string;
  _id: string;
}

export async function getSubCategoriesonCategory(id: string): Promise<SubCategoryinterface[] | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories");
    }
    const payload = await response.json();
    //console.log("payload", payload);

    return payload?.data;
  } catch (error) {
    return null;
  }
}
