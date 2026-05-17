import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay } from "swiper/modules";
import slide1 from '@/sources/images/slide1.jpg'
import slide2 from '@/sources/images/slide2.jpg'
import slide3 from '@/sources/images/slide3.jpg'
import slide4 from '@/sources/images/slide1.jpg'
import Image from "next/image";

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
          <Image
            className="w-full h-full"
            src={slide1}
            alt="slid1"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <Image
            className="w-full h-full"
            src={slide2}
            alt="slid1"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <Image
            className="w-full h-full"
            src={slide3}
            alt="slid1"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <Image
            className="w-full h-full"
            src={slide4}
            alt="slid1"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
