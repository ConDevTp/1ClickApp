import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { FootersData } from "../../../Data/AllData";
import "./index.css";
/* eslint-disable import/no-webpack-loader-syntax */
import indexCssRaw from "!!raw-loader!./index.css";

const Footer1 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || FootersData[id];

  if (!data) return null;

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-1"
      style={{
        backgroundColor: data.backgroundColor,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : "none",
        color: data.textColor,
        padding: data.padding || "20px 0",
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize,
          fontWeight: data.fontWeight,
          margin: 0,
        }}
      >
        {data.text}
      </h1>
      {data.image1 && <img src={data.image1} alt={data.text} className="img-fluid" />}
      {data.image2 && <img src={data.image2} alt={data.text} className="img-fluid" />}
    </footer>
  );
};

export default Footer1;

export const Footer_1 = `
  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-1"
      style={{
        backgroundColor: data.backgroundColor,
        backgroundImage: data.backgroundImage ? \`url(\${data.backgroundImage})\` : "none",
        color: data.textColor,
        padding: data.padding || "20px 0",
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize,
          fontWeight: data.fontWeight,
          margin: 0,
        }}
      >
        {data.text}
      </h1>
      {data.image1 && <img src={data.image1} alt={data.text} className="img-fluid" />}
      {data.image2 && <img src={data.image2} alt={data.text} className="img-fluid" />}
    </footer>
  );
`;

export const Footer_1_CSS = indexCssRaw;