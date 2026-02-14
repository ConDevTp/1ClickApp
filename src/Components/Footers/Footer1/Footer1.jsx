import React from "react";
import { useAllData } from "../../../Hooks/useAllData";
import { FootersData } from "../../../Data/AllData"; // مسیر ایمپورت را چک کنید

const Footer1 = ({ id }) => {
  const { value } = useAllData(id);
  const data = value || FootersData[id];

  if (!data) return null;

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        padding: data.padding,
        fontFamily: data.fontFamily,
      }}
    >
      <h1
        style={{
          fontSize: data.fontSize,
          fontWeight: data.fontWeight,
          margin: 0, // حذف مارجین اضافی برای تراز بهتر
        }}
      >
        {data.text}
      </h1>
    </footer>
  );
};

export default Footer1;
