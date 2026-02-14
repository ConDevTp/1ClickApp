import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import { AllData } from "../Data/AllData";

export const useAllData = (id = null) => {
  const { allData, updateData, setAllData } = useContext(PanelContext);

  if (!id) return { allData };

  const value = allData[id] || {};
  const initialValue = AllData[id] || {};

  // Check If Data Changed For Show Reset Button
  const isDirty = JSON.stringify(value) !== JSON.stringify(initialValue);
  // Update Data Function For Edit Panel
  const setValue = (fieldName, newValue) => updateData(id, fieldName, newValue);
  // Reset Item To Initial Value
  const resetItem = () => {
    setAllData((prev) => ({
      ...prev,
      [id]: { ...initialValue },
    }));
  };

  return { value, setValue, resetItem, isDirty };
};
