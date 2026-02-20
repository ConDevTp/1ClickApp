import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { FootersData } from "../../../Data/AllData";
import "./index.css";
import indexCssRaw from "!!raw-loader!./index.css";
import { getBackgroundStyle } from "../../../Utils/styleHelpers";

const Footer2 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || FootersData[id];

  if (!data) return null;

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-2"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        padding: data.padding,  
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
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
          fontSize: `calc(${data.fontSize} - 4px)`,
          fontWeight: data.fontWeight,
          opacity: 0.8,
          margin: 0,
        }}
      >
        {data.brandText}
      </h3>
    </footer>
  );
};

export default Footer2;

export const Footer_2 = `
  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-2"
      style={{
        ...getBackgroundStyle(data),
        color: data.textColor,
        padding: data.padding,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
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
  );
`;

export const Footer_2_CSS = indexCssRaw;