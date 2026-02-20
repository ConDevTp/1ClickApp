import React from "react";
import CustomColorPicker from "../../Components/UI/ColorPicker";

const SolidBg = ({ bgColor, setSolidColor }) => {
  return (
    <CustomColorPicker 
      label="رنگ پس‌زمینه"
      value={bgColor !== "transparent" ? bgColor : "rgba(255,255,255,1)"} 
      onChange={setSolidColor} 
    />
  );
};

export default SolidBg;