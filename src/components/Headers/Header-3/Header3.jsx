import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../../../schemas";
import { useStore } from "../../../store/useStore";
import { resolveSection } from "../../../utils/resolver";

const Header3 = ({ id }) => {
  const overrides = useStore((s) => s.sections[id]?.overrides, shallow);
  const activeElement = useStore((s) => s.activeElement, shallow);
  const setActiveElement = useStore((s) => s.setActiveElement);

  // ترکیب دیتای پیش‌فرض با تغییرات کاربر
  const data = useMemo(
    () => resolveSection(SchemaRegistry["Header-3"], overrides),
    [overrides],
  );

  const getSelectStyle = (path) => ({
    outline:
      activeElement.sectionId === id && activeElement.fieldPath === path
        ? "2px solid #0d6efd"
        : "none",
    outlineOffset: "3px",
    cursor: "pointer",
  });

  return (
    <nav
      style={{ ...data.section.style, display: "flex", alignItems: "center" }}
    >
      <div className="container-fluid d-flex justify-content-between">
        {/* بخش برند */}
        <div
          style={{ ...data.brand.style, ...getSelectStyle("brand") }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveElement(id, "brand");
          }}
        >
          {data.brand.content.text}
        </div>

        {/* بخش جستجو */}
        <form
          className="d-flex"
          style={getSelectStyle("search")}
          onClick={(e) => {
            e.stopPropagation();
            setActiveElement(id, "search");
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder={data.search.input.placeholder}
            onChange={() => {}} // چون این محیط ادیتوره، فرم نباید کار کنه
          />
          <button
            className="btn btn-outline-success"
            type="button"
            style={{
              color: data.search.button.style.color,
              borderColor: data.search.button.style.color,
            }}
          >
            {data.search.button.text}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header3;
