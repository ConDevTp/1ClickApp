import React from "react";
import { HerosData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";
import "./index.css";
import indexCssRaw from "!!raw-loader!./index.css";
import { getBackgroundStyle } from "../../../Utils/styleHelpers";

const Hero1 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HerosData[id];

  if (!data) return null;

  return (
    <section
      className="hero-1 d-flex align-items-center text-center"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
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

export const Hero_1 = `
  return (
    <section
      className="hero-1 d-flex align-items-center text-center"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
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

export const Hero_1_CSS = indexCssRaw;