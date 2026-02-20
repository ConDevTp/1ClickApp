import React from "react";
import { HerosData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";
import "./index.css";
import indexCssRaw from "!!raw-loader!./index.css";
import { getBackgroundStyle } from "../../../Utils/styleHelpers";

const Hero2 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HerosData[id];

  if (!data) return null;

  return (
    <section
      className="hero-2 d-flex align-items-center"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        minHeight: data.height || "500px",
        padding: "80px 0",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-start mb-5 mb-lg-0">
            <h1
              className="fw-bold mb-3"
              style={{
                fontWeight: data.fontWeight,
                fontSize: data.titleSize || "2.5rem",
              }}
            >
              {data.title}
            </h1>
            <p
              className="lead mb-4"
              style={{
                opacity: 0.8,
                fontSize: data.subtitleSize || "1.1rem",
              }}
            >
              {data.description}
            </p>
            <div className="d-flex gap-3">
              {data.primaryButton && (
                <button
                  className="btn btn-primary btn-lg px-4"
                  style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
                >
                  {data.primaryButton}
                </button>
              )}
              {data.secondaryButton && (
                <button
                  className="btn btn-outline-secondary btn-lg px-4"
                  style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
                >
                  {data.secondaryButton}
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              className="rounded shadow-lg"
              style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(255,255,255,0.3)"
              }}
            >
           <img src={data.image} alt={data.title} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;

export const Hero_2 = `
  return (
    <section
      className="hero-2 d-flex align-items-center"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        minHeight: data.height || "500px",
        padding: "80px 0",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-start mb-5 mb-lg-0">
            <h1
              className="fw-bold mb-3"
              style={{
                fontWeight: data.fontWeight,
                fontSize: data.titleSize || "2.5rem",
              }}
            >
              {data.title}
            </h1>
            <p
              className="lead mb-4"
              style={{
                opacity: 0.8,
                fontSize: data.subtitleSize || "1.1rem",
              }}
            >
              {data.description}
            </p>
            <div className="d-flex gap-3">
              {data.primaryButton && (
                <button
                  className="btn btn-primary btn-lg px-4"
                  style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
                >
                  {data.primaryButton}
                </button>
              )}
              {data.secondaryButton && (
                <button
                  className="btn btn-outline-secondary btn-lg px-4"
                  style={{ fontFamily: data.fontFamily, fontWeight: data.fontWeight }}
                >
                  {data.secondaryButton}
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              className="rounded shadow-lg"
              style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(255,255,255,0.3)"
              }}
            >
           <img src={data.image} alt={data.title} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
`;

export const Hero_2_CSS = indexCssRaw;