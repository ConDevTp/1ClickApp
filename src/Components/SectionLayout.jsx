import React, { Suspense } from "react";
import Slider from "./Slider/Slider";

const SectionLayout = ({ id, list }) => {
  return (
    <Slider id={id}>
      {list.map((Component, index) => (
        <div className="w-100" key={index}>
          <Suspense
            fallback={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                در حال لود...
              </div>
            }
          >
            <Component />
          </Suspense>
        </div>
      ))}
    </Slider>
  );
};

export default SectionLayout;
