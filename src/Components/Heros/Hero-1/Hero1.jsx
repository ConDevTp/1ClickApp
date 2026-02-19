import React from "react";
// توجه: این فایل HerosData رو هنوز نداری، ولی فرض می‌کنیم که سیستم می‌سازدش
import { HerosData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";
import "./index.css";

// برای استخراج CSS
/* eslint-disable import/no-webpack-loader-syntax */
import indexCssRaw from "!!raw-loader!./index.css";

const Hero1 = ({ id }) => {
  // اتصال به سیستم دیتا و هوک
  const { value } = useAllData(id);
  // اگر دیتای زنده (هوک) نبود، از دیتای استاتیک استفاده کن
  const data = value || HerosData[id];

  // اگر دیتا هنوز لود نشده بود، چیزی نشون نده (یا لودینگ نشون بده)
  if (!data) return null;

  return (
    <section
      className="hero-1 d-flex align-items-center text-center"
      style={{
        // استفاده از دیتا برای استایل‌ها
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        fontFamily: data.fontFamily, // خیلی مهم برای سیستم فونت
        minHeight: data.height || "400px",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <h1
          className="display-4 fw-bold"
          style={{
            fontWeight: data.fontWeight,
            fontSize: data.titleSize || "3rem",
            marginBottom: "20px",
          }}
        >
          {data.title}
        </h1>
        <p
          className="lead"
          style={{
            fontSize: data.subtitleSize || "1.25rem",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 30px auto",
          }}
        >
          {data.subtitle}
        </p>
        {data.buttonText && (
          <button 
            className="btn btn-primary btn-lg"
            style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
          >
            {data.buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero1;

// =====================================================================
// بخش‌های مورد نیاز برای سیستم خروجی اتوماتیک (DynamicImports)
// =====================================================================

// Code For Export (کد JSX خام برای فایل زیپ)
export const Hero_1 = `
  return (
    <section
      className="hero-1 d-flex align-items-center text-center"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        fontFamily: data.fontFamily,
        minHeight: data.height || "400px",
        padding: "60px 0",
      }}
    >
      <div className="container">
        <h1
          className="display-4 fw-bold"
          style={{
            fontWeight: data.fontWeight,
            fontSize: data.titleSize || "3rem",
            marginBottom: "20px",
          }}
        >
          {data.title}
        </h1>
        <p
          className="lead"
          style={{
            fontSize: data.subtitleSize || "1.25rem",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 30px auto",
          }}
        >
          {data.subtitle}
        </p>
        {data.buttonText && (
          <button 
            className="btn btn-primary btn-lg"
            style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
          >
            {data.buttonText}
          </button>
        )}
      </div>
    </section>
  );
`;

// Css Code For Export (کد CSS خام برای فایل زیپ)
export const Hero_1_CSS = indexCssRaw;