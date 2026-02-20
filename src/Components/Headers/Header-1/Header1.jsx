import React from "react";
import { HeadersData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";
import "./index.css";
import indexCssRaw from "!!raw-loader!./index.css";
import { getBackgroundStyle } from "../../../Utils/styleHelpers";

const Header1 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HeadersData[id];

  if (!data) return null;

  return (
    <div
      className="Header-1"
      style={{
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        fontWeight: data.fontWeight,
      }}
    >
      <div className="collapse" id={`${id}-collapse`}>
        <div
          className="p-4"
          style={{
            ...getBackgroundStyle(data),
            color: data.textColor,
          }}
        >
          <h5
            className="h4"
            style={{
              color: data.textColor,
              fontSize: `calc(${data.fontSize} + 4px)`,
              fontWeight: data.fontWeight,
            }}
          >
            {data.title}
          </h5>
          <span
            style={{
              fontSize: data.fontSize,
              opacity: 0.8,
              fontWeight: data.fontWeight,
            }}
          >
            {data.subtitle}
          </span>
        </div>
      </div>
      <nav
        className="navbar navbar-dark"
        style={{ ...getBackgroundStyle(data) }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${id}-collapse`}
            aria-controls={`${id}-collapse`}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header1;

export const Header_1 = `
  return (
    <div
      className="Header-1"
      style={{
        fontFamily: data.fontFamily,
        lineHeight: data.lineHeight,
        fontWeight: data.fontWeight,
      }}
    >
      <div className="collapse" id={\`\${id}-collapse\`}>
        <div
          className="p-4"
          style={{
            ...getBackgroundStyle(data),
            color: data.textColor,
          }}
        >
          <h5
            className="h4"
            style={{
              color: data.textColor,
              fontSize: \`calc(\${data.fontSize} + 4px)\`,
              fontWeight: data.fontWeight,
            }}
          >
            {data.title}
          </h5>
          <span
            style={{
              fontSize: data.fontSize,
              opacity: 0.8,
              fontWeight: data.fontWeight,
            }}
          >
            {data.subtitle}
          </span>
        </div>
      </div>
      <nav
        className="navbar navbar-dark"
        style={{ ...getBackgroundStyle(data) }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={\`#\${id}-collapse\`}
            aria-controls={\`\${id}-collapse\`}
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
`;

export const Header_1_CSS = indexCssRaw;