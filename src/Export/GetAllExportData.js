import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import { head } from "framer-motion/client";

const GetAllExportData = () => {
  const { allData, activeSelection } = useContext(PanelContext);

  //   THIS IS FOR JUST GET DATA HEADER
  const HeaderNumber = activeSelection["Header"] || 1;
  const ActiveHeader = "Header-" + HeaderNumber;

  const formattedData = Object.entries(allData[ActiveHeader])
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `    ${key}: ${formattedValue},`;
    })
    .join("\n");

  const HeaderData = `export const HeadersData = { "${ActiveHeader}": {\n${formattedData}\n  },
    };`;
  //   THIS IS FOR JUST GET DATA HEADER

  //   THIS IS FOR JUST GET DATA Footer
  const FooterNumber = activeSelection["Footer"] || 1;
  const ActiveFooter = "Footer-" + FooterNumber;

  const formattedDataFooter = Object.entries(allData[ActiveFooter])
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `    ${key}: ${formattedValue},`;
    })
    .join("\n");

  const FooterData = `export const FootersData = { "${ActiveFooter}": {\n${formattedDataFooter}\n  },
    };`;
  //   THIS IS FOR JUST GET DATA Footer

  const AllDatas =
    HeaderData +
    FooterData +
    `export const AllData = {
    ...HeadersData,
    ...FootersData,
  };`;

  return AllDatas;
};

export default GetAllExportData;
