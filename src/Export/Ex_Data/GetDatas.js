import { AllSections } from "../AllSections";

export const GetDatas = (allData, activeSelection) => {
  let allExportsString = "";
  let allSpreadsString = "";

  AllSections.forEach((section) => {
    const activeNum = activeSelection[section] || 1;
    const activeId = `${section}-${activeNum}`;
    const sectionData = allData[activeId] || {};

    const sectionObject = {
      [activeId]: sectionData
    };

    const dataName = `${section}sData`;
    allExportsString += `export const ${dataName} = ${JSON.stringify(sectionObject, null, 2)};\n\n`;
    allSpreadsString += `  ...${dataName},\n`;
  });

  return `${allExportsString}export const AllData = {\n${allSpreadsString}};`;
};