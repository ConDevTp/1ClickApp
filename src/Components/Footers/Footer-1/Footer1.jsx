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
        color: data.textColor,
        padding: data.padding,
        fontFamily: data.fontFamily,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize,
          fontWeight: data.fontWeight,
          margin: 0, // حذف مارجین اضافی برای تراز بهتر
        }}
      >
        {data.text}
      </h1>
    </footer>
  );
};

export default Footer1;

// Code For Export
export const Footer_1 = `
  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column footer-1"
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
          margin: 0,
        }}
      >
        {data.text}
      </h1>
    </footer>
  );`;

  // Css Code Fro Export
  export const Footer_1_CSS = indexCssRaw;
  