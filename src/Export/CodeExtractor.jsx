import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { processAllFonts } from "./Ex_Fonts/FontManager";
import { processImages } from "./Ex_Images/ImageManager";
import { generateAllDataFile } from "./Ex_Data/AllData_File";
import GenerateSectionFile from "./GenerateSectionFile";
import { 
  generateAllLayoutFile, 
  generateAppFile, 
  generateIndexJsFile, 
  generatePackageJsonFile, 
  generateIndexHtmlFile 
} from "./Ex_Files";
import { AllSections } from "./AllSections";
import { getDynamicSections } from "./DynamicImports";
import { generateStyleHelpersFile } from "./Ex_Utils/StyleHelpersJs";

const CodeExtractor = () => {
  const { activeSelection, allData } = useContext(PanelContext);

  const handleDownload = async () => {
    const zip = new JSZip();

    const dynamicSections = getDynamicSections();

    AllSections.forEach((sectionName) => {
      const componentsArray = dynamicSections[sectionName];
      if (componentsArray && componentsArray.length > 1) {
        GenerateSectionFile(sectionName, componentsArray, zip, activeSelection);
      }
    });

    const fontImports = await processAllFonts(zip, allData, activeSelection, AllSections);

    const processedData = await processImages(zip, allData, AllSections, activeSelection);

    generateAllDataFile(zip, processedData, activeSelection);
    generateAllLayoutFile(zip);
    generateAppFile(zip);
    generateIndexJsFile(zip, fontImports);
    generatePackageJsonFile(zip);
    generateIndexHtmlFile(zip);
    generateStyleHelpersFile(zip);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "SourceCode.zip");
  };

  return (
    <div className="p-4">
      <button onClick={handleDownload} className="btn btn-primary">
        دانلود کد
      </button>
    </div>
  );
};

export default CodeExtractor;