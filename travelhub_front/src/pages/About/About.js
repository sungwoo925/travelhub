import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./About.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const images = [
  "/images/about1.png",
  "/images/about2.png",
  "/images/about3.png",
  "/images/about4.png",
  "/images/about5.png",
  "/images/about6.png",
  "/images/about7.png",
  "/images/about8.png",
  "/images/about9.png",
  "/images/about10.png",
];

export default function about() {
  return (
    <>
      <div className="Swiper-about">
        <div>
          <h2>이용방법</h2>
        </div>
        <Swiper
          cssMode={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="slide-image"
              />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next custom-button"></div>
          <div className="swiper-button-prev custom-button"></div>
        </Swiper>
      </div>
    </>
  );
}
