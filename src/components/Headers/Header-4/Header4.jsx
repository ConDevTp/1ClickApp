import { useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../../../schemas";
import { useStore } from "../../../store/useStore";
import { resolveSection } from "../../../utils/resolver";

const Header4 = ({ id }) => {
  const overrides = useStore((s) => s.sections[id]?.overrides, shallow);
  const activeElement = useStore((s) => s.activeElement, shallow);
  const setActiveElement = useStore((s) => s.setActiveElement);

  const data = useMemo(
    () => resolveSection(SchemaRegistry["Header-4"], overrides),
    [overrides],
  );

  const [hoveredItem, setHoveredItem] = useState(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const getSelectStyle = (path) => ({
    outline:
      activeElement.sectionId === id && activeElement.fieldPath === path
        ? "2px solid #0d6efd"
        : "none",
    outlineOffset: "-2px",
    cursor: "pointer",
    transition: "outline 0.2s",
  });

  const handleClick = (e, path) => {
    e.stopPropagation();
    setActiveElement(id, path);
  };

  return (
    <nav
      style={{
        backgroundColor: data.section.style.backgroundColor,
        color: data.section.style.color,
        fontFamily: data.section.style.fontFamily,
        fontSize: data.section.style.fontSize,
        lineHeight: data.section.style.lineHeight,
        position: data.section.style.position,
        padding: data.section.style.padding,
        ...getSelectStyle("section"),
      }}
      onClick={(e) => handleClick(e, "section")}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a
          href={data.brand.content.url}
          style={{
            color: data.brand.style.color,
            fontSize: data.brand.style.fontSize,
            fontWeight: data.brand.style.fontWeight,
            textDecoration: data.brand.style.textDecoration,
            ...getSelectStyle("brand"),
          }}
          onClick={(e) => {
            e.preventDefault();
            handleClick(e, "brand");
          }}
        >
          {data.brand.content.text}
        </a>

        <ul
          className="d-flex align-items-center"
          style={{ ...data.menu.style, ...getSelectStyle("menu") }}
          onClick={(e) => handleClick(e, "menu")}
        >
          {data.menu.items.map((item, index) => (
            <li key={item.id}>
              <a
                href={item.content.url}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontSize: item.style.fontSize || data.section.style.fontSize,
                  color:
                    hoveredItem === index
                      ? item.style.hoverColor
                      : item.style.color,
                  ...getSelectStyle(`menu.items[${index}]`),
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(e, `menu.items[${index}]`);
                }}
              >
                {item.content.text}
              </a>
            </li>
          ))}
        </ul>

        <button
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            ...data.cta.style,
            ...(isBtnHovered ? data.cta.hover : {}),
            ...getSelectStyle("cta"),
          }}
          onClick={(e) => handleClick(e, "cta")}
        >
          {data.cta.content.text}
        </button>
      </div>
    </nav>
  );
};

export default Header4;
