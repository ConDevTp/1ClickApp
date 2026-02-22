import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../../../schemas";
import { useStore } from "../../../store/useStore";
import { resolveSection } from "../../../utils/resolver";
import "./index.css";

const Header1 = ({ id }) => {
  const overrides = useStore((s) => s.sections[id]?.overrides, shallow);
  const activeElement = useStore((s) => s.activeElement, shallow);
  const setActiveElement = useStore((s) => s.setActiveElement);

  const data = useMemo(
    () => resolveSection(SchemaRegistry["Header-1"], overrides),
    [overrides],
  );

  const getSelectStyle = (path) => ({
    outline:
      activeElement.sectionId === id && activeElement.fieldPath === path
        ? "2px solid #0d6efd"
        : "none",
    outlineOffset: "-2px",
    cursor: "pointer",
  });

  const handleClick = (e, path) => {
    e.stopPropagation();
    setActiveElement(id, path);
  };

  return (
    <div
      className="Header-1"
      style={{
        backgroundColor: data.section.style.backgroundColor,
        color: data.section.style.color,
        fontFamily: data.section.style.fontFamily,
        fontSize: data.section.style.fontSize,
        lineHeight: data.section.style.lineHeight,
        ...getSelectStyle("section"),
      }}
      onClick={(e) => handleClick(e, "section")}
    >
      <div className="collapse" id={`${id}-collapse`}>
        <div className="p-4">
          <h5
            className="h4"
            style={{
              color: data.title.style.color,
              fontSize: data.title.style.fontSize,
              fontWeight: data.title.style.fontWeight,
              ...getSelectStyle("title"),
            }}
            onClick={(e) => handleClick(e, "title")}
          >
            {data.title.content.text}
          </h5>
          <span
            style={{
              color: data.subtitle.style.color,
              fontSize: data.subtitle.style.fontSize,
              opacity: 0.8,
              fontWeight: data.subtitle.style.fontWeight,
              display: "block",
              ...getSelectStyle("subtitle"),
            }}
            onClick={(e) => handleClick(e, "subtitle")}
          >
            {data.subtitle.content.text}
          </span>
        </div>
      </div>
      <nav className="navbar navbar-dark">
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
