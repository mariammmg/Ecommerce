"use client";

import { getproducts } from "@/apis/products.api";
import { getSingleproduct } from "@/apis/singleproduct.api";
import ButtonCom from "@/app/_components/ButtonCom";
import RatingStars from "@/app/_components/RatingStar/RatingStars";
import SimSlider from "@/app/_components/SimProductsSlider/SimSlider";
import Slider from "@/app/_components/Slider/Slider";

import WishListButton from "@/app/_components/wishlistButton";
import { Button } from "@/components/ui/button";
import { Productinterface } from "@/interface/product.interface";
import  { useEffect, useState } from "react";
import {  FaHeart } from "react-icons/fa";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<Productinterface[]>([]);
  const [imgactive, setimgactive] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("details");

  useEffect(() => {
    async function fetchProduct() {
    const id=(await (params)).id;
      const product = await getSingleproduct(id);
      if (!product) {
        
        return [];
      }
      const AllProducts = await getproducts();
      
      if (!AllProducts) {
        return [];
      }
      const filtered = AllProducts.filter(
        (p) => p.category.name === product.category.name && p.id !== product.id,
      );

      setFilteredData(filtered);
      setData(product);
      setimgactive(product?.imageCover);
    }

    fetchProduct();
  },[]);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="md:w-1/3 w-full p-4">
          <img src={imgactive} alt={data?.title} />

          <div className="flex gap-3">
            {/*data?.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${data.title} image ${index + 1}`}
                width={60}
                height={60}
                onClick={() => setimgactive(image)}
              />
            ))*/}
            <Slider
              pageList={data?.images}
              setimgActive={setimgactive}
              slidersPerView={3}
            />
          </div>
        </div>

        <div className="md:w-2/3 w-full p-2">
          <div className="flex gap-2 mb-4">
            <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-100">
              {data?.category.name}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
              {data?.brand.name}
            </span>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            {data?.title}
          </p>
          <p className="text-xl">{data?.description}</p>
          <div className="flex gap-2">
            <RatingStars rating={data?.ratingsAverage} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <>
              {data?.priceAfterDiscount ? (
                <div className="flex gap-3">
                  <p className="text-green-500 font-bold text-2xl">
                    {data?.priceAfterDiscount}
                  </p>
                  <p className="line-through text-gray-400 text-md">
                    {data?.price} EGP
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 -mx-8 mb-2 p-6 flex justify-between gap-4 items-center border-t border-gray-100">
                  <span className="text-gray-500 font-medium">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {data?.price} EGP
                  </span>
                </div>
              )}
            </>
          </div>
          <div className="flex w-full gap-5 my-5">
            <ButtonCom id={data?.id} cls=" bg-green-500 ">
              Add to Cart
            </ButtonCom>
            <Button className=" bg-black">Buy it Now</Button>
          </div>
          <div className="flex  w-full mt-3 gap-3">
            {/* Big Wishlist Button */}
            <WishListButton
              id={data?.id}
              cls=" flex-1  bg-white border border-black text-black hover:bg-gray-100"
            >
              <FaHeart />
              Add to Wishlist
            </WishListButton>
          </div>
        </div>
      </div>

      {/*filteredData?.map((product: Productinterface) => (
          <ProductItem key={product.id} product={product} />
        ))*/}

      <div id="product-details-tabs" className="py-3">
        <div className="container mx-auto max-w-[1200px]">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                <button
                  className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                  onClick={() => setActiveTab("details")}
                >
                  <svg
                    data-prefix="fas"
                    data-icon="box"
                    className="svg-inline--fa fa-box text-sm"
                    role="img"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                    ></path>
                  </svg>
                  Product Details
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setActiveTab("reviews")}
                >
                  <svg
                    data-prefix="fas"
                    data-icon="star"
                    className="svg-inline--fa fa-star text-sm"
                    role="img"
                    viewBox="0 0 576 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
                    ></path>
                  </svg>
                  Reviews ({data?.reviews?.length || 0})
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setActiveTab("shipping")}
                >
                  <svg
                    data-prefix="fas"
                    data-icon="truck"
                    className="svg-inline--fa fa-truck text-sm"
                    role="img"
                    viewBox="0 0 576 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                    ></path>
                  </svg>
                  Shipping &amp; Returns
                </button>
              </div>
            </div>
            {activeTab === "details" && <Productinfo product={data} />}
            {activeTab === "reviews" && <Reviews product={data} />}
            {activeTab === "shipping" && <Shipping />}
          </div>
        </div>
      </div>
      <SimSlider slidersPerView={4} products={filteredData} />

      <div className="bg-[#F0FFF4] py-8 px-6 rounded-lg">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="flex items-center gap-4">
      <div className="bg-[#DCFCE7] p-4 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#166534]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg leading-tight">
          Free Shipping
        </h4>
        <p className="text-sm text-slate-500">On orders over 500 EGP</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-[#DCFCE7] p-4 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#166534]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg leading-tight">
          Easy Returns
        </h4>
        <p className="text-sm text-slate-500">14-day return policy</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-[#DCFCE7] p-4 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#166534]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg leading-tight">
          Secure Payment
        </h4>
        <p className="text-sm text-slate-500">100% secure checkout</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-[#DCFCE7] p-4 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#166534]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg leading-tight">
          24/7 Support
        </h4>
        <p className="text-sm text-slate-500">Contact us anytime</p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
export function Productinfo({ product }: { product: Productinterface }) {
   // console.log(product);
    
    //console.log(percentages);
    return (
      <>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About this Product
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Product Information
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-900 font-medium">
                      {product.category.name}
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Subcategory</span>
                    <span className="text-gray-900 font-medium">
                      {product.subcategory[0].name}
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Brand</span>
                    <span className="text-gray-900 font-medium">
                      {product.brand.name}
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Items Sold</span>
                    <span className="text-gray-900 font-medium">
                      {product.sold} sold
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg
                      data-prefix="fas"
                      data-icon="check"
                      className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                      ></path>
                    </svg>
                    Premium Quality Product
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg
                      data-prefix="fas"
                      data-icon="check"
                      className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                      ></path>
                    </svg>
                    100% Authentic Guarantee
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg
                      data-prefix="fas"
                      data-icon="check"
                      className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                      ></path>
                    </svg>
                    Fast &amp; Secure Packaging
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg
                      data-prefix="fas"
                      data-icon="check"
                      className="svg-inline--fa fa-check text-primary-600 mr-2 w-4"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                      ></path>
                    </svg>
                    Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );

}
export function Reviews({ product }: { product: Productinterface }) {
  const total = product.reviews?.length || 0;

  const percentages = [1, 2, 3, 4, 5].map((star) => {
    const count = Math.round(
      product.reviews?.filter((r) => Math.round(r.rating) === star).length || 0,
    );
    return (count / total) * 100;
  });
  console.log(percentages);
  return (
    <>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Rating Box: 1/3 width */}
          <div className="w-full md:w-1/3 text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {product.ratingsAverage}
            </div>
            <div className="text-yellow-400 flex justify-center space-x-1">
              {/* Stars */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6l130.3 68.5c23.4 12.3 50.9-7.6 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6l130.3 68.5c23.4 12.3 50.9-7.6 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6l130.3 68.5c23.4 12.3 50.9-7.6 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6l130.3 68.5c23.4 12.3 50.9-7.6 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M288 0c-11.7 0-23.4 6-29.6 16.4L193.1 125.3 33.2 150.7c-12 1.9-21.7 10.7-24.9 22.3s1.2 23.7 10.6 31.9L125.3 320l-24.5 145.5c-2 12 2.9 24.3 12.7 31.6 9.7 7.2 22.4 8.2 32.8 2.7L288 439.6l130.3 68.5c10.4 5.5 23.1 4.5 32.8-2.7 9.8-7.3 14.7-19.6 12.7-31.6L450.7 320l106.4-90.1c9.4-8.2 13.7-20.8 10.6-31.9s-12.9-20.4-24.9-22.3L382.9 125.3 317.6 16.4C311.4 6 299.7 0 288 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-2">Based on {product.reviews?.length} reviews</p>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="space-y-2">
              {/* 5 Star */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">5 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full " style={{ width: `${percentages[4]}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-10">~{percentages[4].toFixed(0)}%</span>
              </div>
              {/* 4 Star */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">4 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full " style={{ width: `${percentages[3]}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-10">~{percentages[3].toFixed(0)}%</span>
              </div>
              {/* 3 Star */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">3 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full " style={{ width: `${percentages[2]}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-10">~{percentages[2].toFixed(0)}%</span>
              </div>
              {/* 2 Star */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">2 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full " style={{ width: `${percentages[1]}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-10">~{percentages[1].toFixed(0)}%</span>
              </div>
              {/* 1 Star */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">1 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full " style={{ width: `${percentages[0]}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-10">~{percentages[0].toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function Shipping(){
      return (
        <>
          <div className="max-w-6xl mx-auto space-y-6 p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-emerald-600 p-2.5 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-800 text-lg">
          Shipping Information
        </h3>
      </div>
      <ul className="space-y-3">
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Free
          shipping on orders over $50
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Standard
          delivery: 3-5 business days
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Express
          delivery available (1-2 business days)
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Track your
          order in real-time
        </li>
      </ul>
    </div>
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-emerald-600 p-2.5 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-800 text-lg">
          Returns &amp; Refunds
        </h3>
      </div>
      <ul className="space-y-3">
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> 30-day
          hassle-free returns
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Full
          refund or exchange available
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Free
          return shipping on defective items
        </li>
        <li className="flex items-start gap-3 text-sm text-slate-700">
          <span className="text-emerald-500 font-bold">✓</span> Easy
          online return process
        </li>
      </ul>
    </div>
  </div>
  <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-6">
    <div className="flex items-center gap-4">
      <div className="bg-slate-300/50 p-3 rounded-full text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h3 className="font-bold text-slate-800 text-lg">
          Buyer Protection Guarantee
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Get a full refund if your order doesn't arrive or isn't as
          described. We ensure your shopping experience is safe and
          secure.
        </p>
      </div>
    </div>
  </div>
</div>

        </>
      );
}

