import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../../../schemas";
import { useStore } from "../../../store/useStore";
import { resolveSection } from "../../../utils/resolver";

const Hero2 = ({ id }) => {
  const overrides = useStore((s) => s.sections[id]?.overrides, shallow);
  const activeElement = useStore((s) => s.activeElement, shallow);
  const setActiveElement = useStore((s) => s.setActiveElement);

  const data = useMemo(
    () => resolveSection(SchemaRegistry["Hero-2"], overrides),
    [overrides],
  );

  const getSelectStyle = (path) => ({
    outline:
      activeElement.sectionId === id && activeElement.fieldPath === path
        ? "2px solid #0d6efd"
        : "none",
    outlineOffset: "3px",
    cursor: "pointer",
    transition: "outline 0.2s",
  });

  const handleClick = (e, path) => {
    e.stopPropagation();
    setActiveElement(id, path);
  };

  return (
    <section
      style={{
        backgroundColor: data.section.style.backgroundColor,
        color: data.section.style.color,
        fontFamily: data.section.style.fontFamily,
        fontSize: data.section.style.fontSize,
        lineHeight: data.section.style.lineHeight,
        minHeight: data.section.style.minHeight,
        padding: data.section.style.padding,
        ...getSelectStyle("section"),
      }}
      onClick={(e) => handleClick(e, "section")}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-start mb-5 mb-lg-0">
            <h1
              className="fw-bold mb-3"
              style={{
                fontWeight: data.title.style.fontWeight,
                fontSize: data.title.style.fontSize,
                ...getSelectStyle("title"),
              }}
              onClick={(e) => handleClick(e, "title")}
            >
              {data.title.content.text}
            </h1>
            <p
              className="lead mb-4"
              style={{
                opacity: 0.8,
                fontSize: data.description.style.fontSize,
                ...getSelectStyle("description"),
              }}
              onClick={(e) => handleClick(e, "description")}
            >
              {data.description.content.text}
            </p>
            <div className="d-flex gap-3">
              {data.buttons.primary.text && (
                <button
                  className="btn btn-primary btn-lg px-4"
                  style={{
                    fontFamily: data.section.style.fontFamily,
                    fontWeight: data.title.style.fontWeight,
                    ...getSelectStyle("buttons.primary"),
                  }}
                  onClick={(e) => handleClick(e, "buttons.primary")}
                >
                  {data.buttons.primary.text}
                </button>
              )}
              {data.buttons.secondary.text && (
                <button
                  className="btn btn-outline-secondary btn-lg px-4"
                  style={{
                    fontFamily: data.section.style.fontFamily,
                    fontWeight: data.title.style.fontWeight,
                    ...getSelectStyle("buttons.secondary"),
                  }}
                  onClick={(e) => handleClick(e, "buttons.secondary")}
                >
                  {data.buttons.secondary.text}
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="rounded shadow-lg"
              style={{
                ...data.image.style,
                ...getSelectStyle("image"),
              }}
              onClick={(e) => handleClick(e, "image")}
            >
              <img
                src={data.image.content.src}
                alt="Hero"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
