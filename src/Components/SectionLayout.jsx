import React, { Suspense, useContext, useCallback } from "react";
import Slider from "./Slider/Slider";
import { PanelContext } from "../Context/Context";

const SectionLayout = ({ id, list }) => {
  const { setActiveItem, activeItem } = useContext(PanelContext);

  const activeItemHandler = useCallback(
    (uniqueId) => {
      setActiveItem(uniqueId);
    },
    [setActiveItem],
  );

  return (
    <Slider id={id}>
      {list.map((Component, index) => {
        const uniqueId = `${id}-${index + 1}`;
        const isActive = activeItem === uniqueId;

        return (
          <div
            key={uniqueId}
            className={`section-wrapper w-100 ${isActive ? "active-layer" : ""}`}
            onClick={(e) => {
              if (!isActive) {
                activeItemHandler(uniqueId);
              }
            }}
          >
            <Suspense
              fallback={
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ minHeight: "200px" }}
                >
                  در حال بارگذاری...
                </div>
              }
            >
              <Component id={uniqueId} />
            </Suspense>
          </div>
        );
      })}
    </Slider>
  );
};

export default SectionLayout;
