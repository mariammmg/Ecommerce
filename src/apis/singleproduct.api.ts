import { Productinterface } from "@/interface/product.interface";


export async function getSingleproduct(id:string):Promise<Productinterface|null>{ 
    try{
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
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