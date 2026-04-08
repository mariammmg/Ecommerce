import { Productinterface } from "@/interface/product.interface";
import Image from "next/image";
import Products from "./_components/Products/Products";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import { Cat } from "lucide-react";
import Categories from "./_components/Categories/Categories";
import { cookies } from "next/headers";

export default async function Home() {
   
  return (
    <div>
      <HomeSlider slidersPerView={1}></HomeSlider>
      <Categories></Categories>
      <Products></Products>
    </div>
  );
}
