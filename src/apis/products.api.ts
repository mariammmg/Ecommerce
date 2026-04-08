import { Productinterface } from "@/interface/product.interface";


export async function getproducts():Promise<Productinterface[]|null>{ 
    try{
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
    );
    if(!response.ok){
      throw new Error("Failed to fetch products");
    }
    const payload = await response.json();
    
    return payload?.data;
    }catch(error){
      return null
    }
    
  }