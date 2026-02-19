import { GetDatas } from "./GetDatas";

export const generateAllDataFile = (zip, allData, activeSelection) => {
  const AllDataForExport = GetDatas(allData, activeSelection);
  
  zip.folder("myapp").folder("src").folder("Data").file("AllData.js", AllDataForExport);
};