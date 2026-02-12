import React, { useState, useContext } from "react";
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
  const { IsPanelOpen, SetPanelOpen } = useContext(PanelContext);

  const isOpen = IsPanelOpen === id;

  return (
    <div className="Slider mt-5">
      <div style={{ position: "relative", width: "100%" }}>
        <SliderButton ref={setNextEl} className="next-btn" isOpen={isOpen}>
          <FaCaretLeft />
        </SliderButton>

        {!isOpen && (
          <div
            onClick={() => SetPanelOpen(id)}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              cursor: "pointer",
            }}
          />
        )}

        <Swiper
          modules={[Navigation]}
          loop={true}
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
