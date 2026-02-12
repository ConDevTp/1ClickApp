import React from "react";

const SliderButton = React.forwardRef(
  ({ children, className, isOpen }, ref) => {
    return (
      <button
        ref={ref}
        className={`Slider-Button ${isOpen ? "btn-slider-disable" : ""} ${className}`}
      >
        {children}
      </button>
    );
  },
);

export default SliderButton;
