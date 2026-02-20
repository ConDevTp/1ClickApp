import React, { useState, useEffect } from "react";
import SolidBg from "./SolidBg";
import GradientBg from "./GradientBg";
import ImageBg from "./ImageBg";
import SectionHeader from "../../Components/UI/SectionHeader";
import ButtonGroup from "../../Components/UI/ButtonGroup";

const BackgroundControl = ({ data, setValue }) => {
  const [bgType, setBgType] = useState("solid");

  const bgColor = data.backgroundColor || "rgba(255,255,255,1)";
  const bgImage = data.backgroundImage || "";
  const bgSize = data.backgroundSize || "cover";
  const bgPosition = data.backgroundPosition || "center";
  const bgRepeat = data.backgroundRepeat || "no-repeat";
  const bgAttachment = data.backgroundAttachment || "scroll";
  const overlayColor = data.overlayColor || "rgba(0,0,0,0)";

  useEffect(() => {
    if (bgImage.includes("url")) setBgType("image");
    else if (bgImage.includes("gradient")) setBgType("gradient");
    else setBgType("solid");
  }, [bgImage]);

  const isGradient = bgImage.includes("gradient");
  const isRadial = bgImage.includes("radial-gradient");
  const colorRegex = /(rgba?\([^)]+\)|#[a-fA-F0-9]{3,8})/g;
  const gradientMatches = isGradient ? bgImage.match(colorRegex) : null;
  
  const defaultGradColor1 = gradientMatches?.[0] || "rgba(255,255,255,1)";
  const defaultGradColor2 = gradientMatches?.[1] || "rgba(0,0,0,1)";
  const [gradAngle, setGradAngle] = useState(90);

  const handleGradientChange = (c1, c2, angle, type = "linear") => {
    if (type === "radial") setValue("backgroundImage", `radial-gradient(circle, ${c1}, ${c2})`);
    else setValue("backgroundImage", `linear-gradient(${angle}deg, ${c1}, ${c2})`);
    setValue("backgroundColor", "transparent");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024)
      {
          alert("سایز این فایل زیاد هست!")
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("backgroundImage", `url(${reader.result})`);
        setValue("backgroundColor", "transparent");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (e) => {
    const val = e.target.value;
    if (val) {
      setValue("backgroundImage", `url(${val})`);
      setValue("backgroundColor", "transparent");
    } else {
      setValue("backgroundImage", "none");
    }
  };

  const setSolidColor = (color) => {
    setValue("backgroundColor", color);
    setValue("backgroundImage", "none");
    setValue("overlayColor", "rgba(0,0,0,0)");
  };

  const clearBackground = () => {
    setValue("backgroundColor", "transparent");
    setValue("backgroundImage", "none");
    setValue("overlayColor", "rgba(0,0,0,0)");
    setValue("backgroundAttachment", "scroll");
  };

  const extractUrl = (str) => {
    if (!str || !str.includes('url') || str.includes('blob')) return '';
    const match = str.match(/^url\(['"]?(.*?)['"]?\)$/);
    return match ? match[1] : '';
  };

  const typeOptions = [
    { label: 'رنگ', value: 'solid' },
    { label: 'گرادیانت', value: 'gradient' },
    { label: 'عکس', value: 'image' }
  ];

  return (
    <div style={{ width: '100%' }}>
      <SectionHeader 
        title="پس‌زمینه" 
        onReset={clearBackground} 
      />

      <ButtonGroup 
        options={typeOptions}
        activeValue={bgType}
        onChange={(val) => {
          setBgType(val);
          if (val === "solid") {
            setSolidColor(bgColor !== "transparent" ? bgColor : "rgba(255,255,255,1)");
          } else if (val === "gradient") {
            handleGradientChange(defaultGradColor1, defaultGradColor2, gradAngle, isRadial ? "radial" : "linear");
          }
        }}
      />

      {bgType === "solid" && <SolidBg bgColor={bgColor} setSolidColor={setSolidColor} />}
      {bgType === "gradient" && <GradientBg defaultGradColor1={defaultGradColor1} defaultGradColor2={defaultGradColor2} gradAngle={gradAngle} setGradAngle={setGradAngle} handleGradientChange={handleGradientChange} isRadial={isRadial} />}
      {bgType === "image" && <ImageBg bgImage={bgImage} bgSize={bgSize} bgPosition={bgPosition} bgRepeat={bgRepeat} bgAttachment={bgAttachment} overlayColor={overlayColor} handleImageUpload={handleImageUpload} handleImageUrl={handleImageUrl} extractUrl={extractUrl} setValue={setValue} />}
    </div>
  );
};

export default BackgroundControl;