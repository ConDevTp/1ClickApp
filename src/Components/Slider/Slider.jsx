import React, { useState, useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { PanelContext } from "../../Context/Context";
import SliderButton from "./SliderButton";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";

const Slider = ({ children, id }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const { activeItem, activeSelection, updateActiveIndex } =
    useContext(PanelContext);
  const isOpen = activeItem?.includes(id);

  const isFirstRender = useRef(true);

  // خواندن ایندکس واقعی ذخیره شده
  const savedIndex = activeSelection[id] || 0;

  const handleSlideChange = (swiper) => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // استفاده از realIndex به جای activeIndex برای حالت Loop
    updateActiveIndex(id, swiper.realIndex);
  };

  return (
    <div className="Slider mt-5">
      <div style={{ position: "relative", width: "100%" }}>
        <SliderButton ref={setNextEl} className="next-btn" isOpen={isOpen}>
          <FaCaretLeft />
        </SliderButton>

        <Swiper
          key={id}
          initialSlide={savedIndex}
          onSlideChange={handleSlideChange}
          loop={true}
          modules={[Navigation]}
          autoHeight={true}
          navigation={{ prevEl, nextEl }}
          watchSlidesProgress={true}
          allowTouchMove={false}
          simulateTouch={false}
          className={`Slider-Container ${isOpen ? "Slider-Open" : ""}`}
        >
          {React.Children.map(children, (child) => (
            <SwiperSlide className="Slider-Item w-100">{child}</SwiperSlide>
          ))}
        </Swiper>

        <SliderButton ref={setPrevEl} className="prev-btn" isOpen={isOpen}>
          <FaCaretRight />
        </SliderButton>
      </div>
    </div>
  );
};

export default Slider;
