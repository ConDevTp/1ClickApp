import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { HeadersData } from "../../../Data/AllData";

const Header2 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || HeadersData[id];

  if (!data) return null;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
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
            // برندها معمولا Bold هستند، اینجا دستی کنترل می‌کنیم
            fontWeight: data.fontWeight,
            fontSize: `calc(${data.fontSize} + 2px)`,
          }}
        >
          {data.brand}
        </a>
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
        <div className="collapse navbar-collapse" id={`${id}-collapse`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data.links &&
              Array.isArray(data.links) &&
              data.links.map((link, index) => (
                <li className="nav-item" key={index}>
                  <a
                    className={`nav-link ${link.active ? "active" : ""} ${
                      link.disabled ? "disabled" : ""
                    }`}
                    href={link.url}
                    tabIndex={link.disabled ? -1 : undefined}
                    aria-disabled={link.disabled ? "true" : undefined}
                    style={{
                      color: link.disabled ? undefined : data.textColor,
                      fontWeight: data.fontWeight, // اعمال ضخامت به لینک‌ها
                    }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
          </ul>
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
      </div>
    </nav>
  );
};

export default Header2;
// Code For Export
export const Header_2 = `import React from "react";
import { HeadersData } from "../../../Data/AllData";
import { useAllData } from "../../../Hooks/useAllData";

const Header2 = ({ id }) => {
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

export default Header2;`;
