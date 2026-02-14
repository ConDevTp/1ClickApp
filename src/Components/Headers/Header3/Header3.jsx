import React from "react";
import { HeadersData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";

const Header3 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HeadersData[id];

  if (!data) return null;

  return (
    <nav
      className="navbar navbar-light"
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
export const Header_3 = `import React from "react";
import { HeadersData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";

const Header3 = ({ id }) => {
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
      <div className="collapse" id={\`\${id}-collapse\`}>
        <div
          className="p-4"
          style={{
            backgroundColor: data.backgroundColor,
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
        style={{ backgroundColor: data.backgroundColor }}
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
};

export default Header3;`;
