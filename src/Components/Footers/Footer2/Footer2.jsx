import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { FootersData } from "../../../Data/AllData";

const Footer2 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || FootersData[id];

  if (!data) return null;

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: data.padding,
        fontFamily: data.fontFamily,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize, // سایز اصلی برای متن کپی‌رایت
          fontWeight: data.fontWeight,
          marginBottom: "10px",
        }}
      >
        {data.copyrightText}
      </h1>

      <h3
        style={{
          // سایز برند را کمی کوچکتر یا بزرگتر از سایز اصلی در نظر می‌گیریم
          fontSize: `calc(${data.fontSize} - 4px)`,
          fontWeight: data.fontWeight,
          opacity: 0.8, // کمی کمرنگ‌تر برای زیبایی
          margin: 0,
        }}
      >
        {data.brandText}
      </h3>
    </footer>
  );
};

export default Footer2;
