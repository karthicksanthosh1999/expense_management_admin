import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay } from "swiper/modules";

export default function AuthCarasole() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay]}
        className="h-full w-full">
        <SwiperSlide className="h-full w-full">
          <img
            className="w-full h-full"
            src="https://swiperjs.com/demos/images/abstract-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <img
            className="w-full h-full"
            src="https://swiperjs.com/demos/images/abstract-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <img
            className="w-full h-full"
            src="https://swiperjs.com/demos/images/abstract-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <img
            className="w-full h-full"
            src="https://swiperjs.com/demos/images/abstract-4.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
