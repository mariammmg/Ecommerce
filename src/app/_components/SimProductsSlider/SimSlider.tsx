"use client"; // must be at the top

import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import { Productinterface } from "@/interface/product.interface";
import ProductItem from "../ProductItem/ProductItem";

interface SliderProps {
  slidersPerView: number;
  products: Productinterface[];
}

export default function SimSlider({ slidersPerView, products }: SliderProps) {
  return (
    <div className="relative w-full py-8">

      <h2 className="mb-3">You may also like</h2>
      {/* Custom Prev button - top left */}
      <div className="absolute right-30 top-5 z-20 p-3 bg-green-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition swiper-button-prev-custom">
        &larr; Prev
      </div>

      {/* Custom Next button - top right */}
      <div className="absolute right-10 top-5 z-20 p-3 bg-green-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition swiper-button-next-custom">
        Next &rarr;
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white w-4 h-4 rounded-full border border-gray-300 inline-block mx-1"></span>`;
          },
          bulletActiveClass: "bg-green-500 w-5 h-5 border-0",
        }}
        spaceBetween={30}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: slidersPerView },
        }}
        className="mySwiper"
      >
        {products.map((prod: Productinterface) => (
          <SwiperSlide
            key={prod.id}
            className="h-[200px] flex justify-center items-center"
          >
            <ProductItem product={prod} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}