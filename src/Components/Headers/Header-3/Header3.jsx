import React from "react";
import { HeadersData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";
import "./index.css";
/* eslint-disable import/no-webpack-loader-syntax */
import indexCssRaw from "!!raw-loader!./index.css";

const Header3 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HeadersData[id];

  if (!data) return null;

  return (
    <nav
      className="navbar navbar-light Header-3"
      style={{
        backgroundColor: data.backgroundColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        fontSize: data.fontSize,
        fontWeight: data.fontWeight,
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: data.textColor,
            fontWeight: data.fontWeight,
            fontSize: `calc(${data.fontSize} + 2px)`,
          }}
        >
          {data.brand}
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder={data.searchPlaceholder}
            aria-label="Search"
            style={{
              fontSize: data.fontSize,
              fontFamily: data.fontFamily,
              fontWeight: data.fontWeight,
            }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            style={{
              fontSize: data.fontSize,
              fontFamily: data.fontFamily,
              fontWeight: data.fontWeight,
            }}
          >
            {data.searchBtnText}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header3;
// Code For Export
export const Header_3 = `
  return (
    <nav
      className="navbar navbar-light Header-3"
      style={{
        backgroundColor: data.backgroundColor,
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        fontSize: data.fontSize,
        fontWeight: data.fontWeight,
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: data.textColor,
            fontWeight: data.fontWeight,
            fontSize: \`calc(\${data.fontSize} + 2px)\`,
          }}
        >
          {data.brand}
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder={data.searchPlaceholder}
            aria-label="Search"
            style={{
              fontSize: data.fontSize,
              fontFamily: data.fontFamily,
              fontWeight: data.fontWeight,
            }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            style={{
              fontSize: data.fontSize,
              fontFamily: data.fontFamily,
              fontWeight: data.fontWeight,
            }}
          >
            {data.searchBtnText}
          </button>
        </form>
      </div>
    </nav>
  );
`;
// Css Code Fro Export
export const Header_3_CSS = indexCssRaw;
