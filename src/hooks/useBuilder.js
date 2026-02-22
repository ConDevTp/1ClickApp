import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { SchemaRegistry } from "../schemas";
import { useStore } from "../store/useStore";
import { getNestedValue, resolveSection } from "../utils/resolver";

export const useBuilder = (sectionId) => {
  const overrides = useStore((s) => s.sections[sectionId]?.overrides, shallow);
  const type = useStore((s) => s.sections[sectionId]?.type);
  const activeElement = useStore((s) => s.activeElement, shallow);
  const setActiveElement = useStore((s) => s.setActiveElement);

  const data = useMemo(() => {
    if (!type) return {};
    return resolveSection(SchemaRegistry[type], overrides);
  }, [type, overrides]);

  const getElementProps = (fieldPath) => {
    const isSelected =
      activeElement.sectionId === sectionId &&
      activeElement.fieldPath === fieldPath;
    const elementData = getNestedValue(data, fieldPath);
    const builderStyles = elementData?.style || {};

    return {
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveElement(sectionId, fieldPath);
      },
      style: {
        ...builderStyles,
        outline: isSelected ? "2px solid #0d6efd" : "none",
        outlineOffset: "-2px",
        cursor: "pointer",
        transition: "outline 0.2s ease-in-out",
      },
    };
  };

  return { data, getElementProps };
};
