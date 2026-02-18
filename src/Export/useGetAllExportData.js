import { useContext } from "react";
import { PanelContext } from "../Context/Context";

// اسمش رو عوض کردم به use... تا ریکت ارور نده
const useGetAllExportData = () => {
  const { allData, activeSelection } = useContext(PanelContext);

  //    THIS IS FOR JUST GET DATA HEADER
  const HeaderNumber = activeSelection["Header"] || 1;
  const ActiveHeader = "Header-" + HeaderNumber;

  // چک کردن اینکه دیتا وجود داره یا نه (جلوگیری از کرش)
  const currentHeaderData = allData[ActiveHeader] || {};

  const formattedData = Object.entries(currentHeaderData)
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `    ${key}: ${formattedValue},`;
    })
    .join("\n");

  const HeaderData = `export const HeadersData = { "${ActiveHeader}": {\n${formattedData}\n  },\n};`;
  //    THIS IS FOR JUST GET DATA HEADER

  //    THIS IS FOR JUST GET DATA Footer
  const FooterNumber = activeSelection["Footer"] || 1;
  const ActiveFooter = "Footer-" + FooterNumber;

  const currentFooterData = allData[ActiveFooter] || {};

  const formattedDataFooter = Object.entries(currentFooterData)
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `    ${key}: ${formattedValue},`;
    })
    .join("\n");

  const FooterData = `export const FootersData = { "${ActiveFooter}": {\n${formattedDataFooter}\n  },\n};`;
  //    THIS IS FOR JUST GET DATA Footer

  const AllDatas =
    HeaderData +
    "\n" +
    FooterData +
    "\n" +
    `export const AllData = {
    ...HeadersData,
    ...FootersData,
  };`;

  return AllDatas;
};

export default useGetAllExportData;