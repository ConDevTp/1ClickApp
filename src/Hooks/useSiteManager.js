import { useState, useEffect } from "react";
import { AllData } from "../Components/Data/AllData";

export const useSiteManager = () => {
  const [activeItem, setActiveItem] = useState(null);

  // Add Changed User Data to Local Storage
  const [allData, setAllData] = useState(() => {
    const saved = localStorage.getItem("site_all_data");
    return saved ? JSON.parse(saved) : AllData;
  });
  // Add Active Selection to Local Storage
  const [activeSelection, setActiveSelection] = useState(() => {
    const saved = localStorage.getItem("active_selection");
    return saved ? JSON.parse(saved) : {};
  });

  // Auto Save To Local Storage When Data Change
  useEffect(() => {
    localStorage.setItem("site_all_data", JSON.stringify(allData));
    localStorage.setItem("active_selection", JSON.stringify(activeSelection));
  }, [allData, activeSelection]);

  // Update Data Function For Edit Panel
  const updateData = (id, fieldName, newValue) => {
    setAllData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [fieldName]: newValue },
    }));
  };

  // Update Active Index For Each Section
  const updateActiveIndex = (sectionId, index) => {
    setActiveSelection((prev) => ({ ...prev, [sectionId]: index }));
  };

  // Reset All Data To Initial State
  const resetAllData = () => {
    if (window.confirm("کل تنظیمات پاک شود؟")) {
      setAllData(AllData);
      setActiveSelection({});
      localStorage.clear();
    }
  };

  // Count Changed Sections For Show Reset All Button
  const changedSectionsCount = Object.keys(allData).filter(
    (id) => JSON.stringify(allData[id]) !== JSON.stringify(AllData[id]),
  ).length;

  // Return All State And Functions For Use In Components
  return {
    allData,
    setAllData,
    activeSelection,
    activeItem,
    setActiveItem,
    updateData,
    updateActiveIndex,
    resetAllData,
    changedSectionsCount,
  };
};
