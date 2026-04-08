"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import vegi from"@/assets/vegi.jpg";


export default function HomeSlider({ slidersPerView}: {slidersPerView:number}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-white! w-5! h-5! rounded-3xl!"></span>`;
        },
        bulletActiveClass: "bg-white! opacity-100! w-[50px]! rounded-3xl!",
      }}
      spaceBetween={50}
      loop
      slidesPerView={slidersPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="relative w-full  h-[300px] shadow-xl overflow-hidden">
          <img
            src={vegi.src}
            alt="Forest"
            className="w-full h-full object-cover"
          />
          {/* Green Overlay */}
          <div className="absolute inset-0 bg-green-600/40" />
          {/* Text Content (Left-Aligned, Vertically Centered) */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white px-4">
            <h1 className="text-3xl font-bold mb-2">Welcme to Nature</h1>
            <p className="mb-4 text-lg">
              Discover beautiful landscapes and adventures
            </p>
            <button className="bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-100 transition">
              Explore Now
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full  h-[300px]  shadow-xl overflow-hidden">
          <img
            src={vegi.src}
            alt="Forest"
            className="w-full h-full object-cover"
          />
          {/* Green Overlay */}
          <div className="absolute inset-0 bg-green-600/40" />
          {/* Text Content (Left-Aligned, Vertically Centered) */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white px-4">
            <h1 className="text-3xl font-bold mb-2">Wee to Nature</h1>
            <p className="mb-4 text-lg">
              Discover beautiful landscapes and adventures
            </p>
            <button className="bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-100 transition">
              Explore Now
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full  h-[300px] shadow-xl overflow-hidden">
          <img
            src={vegi.src}
            alt="Forest"
            className="w-full h-full object-cover"
          />
          {/* Green Overlay */}
          <div className="absolute inset-0 bg-green-600/40" />
          {/* Text Content (Left-Aligned, Vertically Centered) */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white px-4">
            <h1 className="text-3xl font-bold mb-2">Well to Nature</h1>
            <p className="mb-4 text-lg">
              Discover beautiful landscapes and adventures
            </p>
            <div className="flex gap-3 ">
              <button className="bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-100 transition">
                Explore Now
              </button>
              <button className="bg-white text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-100 transition">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
