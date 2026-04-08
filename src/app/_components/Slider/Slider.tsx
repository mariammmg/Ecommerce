"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles

interface SliderProps {
  slidersPerView: number;
  pageList: string[];
  setimgActive: React.Dispatch<React.SetStateAction<string>>;
}

export default function Slider ({slidersPerView, pageList, setimgActive}: SliderProps) {
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
      {pageList.map((img: string) => (
        <SwiperSlide>
          <img
            src={img}
            width={100}
            height={100}
            alt=""
            onClick={() => setimgActive(img)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
