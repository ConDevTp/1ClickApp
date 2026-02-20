import React from "react";
import SectionHeader from "../Components/UI/SectionHeader";
import InputBox from "../Components/UI/InputBox";

const ContentControl = ({ data, setValue }) => {
  const excludeKeys = [
    "id", "height", "backgroundColor", "backgroundImage", "backgroundSize", 
    "backgroundPosition", "backgroundRepeat", "backgroundAttachment", 
    "overlayColor", "fontFamily", "fontSize", "fontWeight", "lineHeight", "color"
  ];

  const contentKeys = Object.keys(data).filter(key => 
    !excludeKeys.includes(key) && 
    !key.toLowerCase().includes("image") && 
    !key.toLowerCase().includes("img") && 
    !key.toLowerCase().includes("logo") &&
    !(Array.isArray(data[key]) || (typeof data[key] === "object" && data[key] !== null))
  );

  if (contentKeys.length === 0) return null;

  const getLabel = (k) => {
    switch (k) {
      case "title": return "عنوان";
      case "subtitle": return "زیرعنوان";
      case "brand": return "نام برند";
      case "searchPlaceholder": return "متن جایگزین جستجو";
      case "searchBtnText": return "متن دکمه جستجو";
      case "description": return "توضیحات";
      case "btnText": return "متن دکمه";
      default: return k;
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <SectionHeader title="محتوا و متون" />
      {contentKeys.map((key) => (
        <InputBox 
          key={key}
          label={getLabel(key)}
          value={data[key] || ""}
          onChange={(newVal) => setValue(key, newVal)}
          rtl={true}
        />
      ))}
    </div>
  );
};

export default ContentControl;