import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { FootersData } from "../../../Data/AllData";
import "./index.css";
/* eslint-disable import/no-webpack-loader-syntax */
import indexCssRaw from "!!raw-loader!./index.css";

const Footer2 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || FootersData[id];

  if (!data) return null;

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-2"
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

// Code For Export
export const Footer_2 = `
  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-2"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: data.padding,
        fontFamily: data.fontFamily,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize,
          fontWeight: data.fontWeight,
          marginBottom: "10px",
        }}
      >
        {data.copyrightText}
      </h1>

      <h3
        style={{
          fontSize: \`calc(\${data.fontSize} - 4px)\`,
          fontWeight: data.fontWeight,
          opacity: 0.8,
          margin: 0,
        }}
      >
        {data.brandText}
      </h3>
    </footer>
  );`;

    // Css Code Fro Export
    export const Footer_2_CSS = indexCssRaw;
    
