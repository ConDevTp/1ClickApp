import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { processAllFonts } from "./Ex_Fonts/FontManager";
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

const CodeExtractor = () => {
  const { activeSelection, allData } = useContext(PanelContext);

  const handleDownload = async () => {
    const zip = new JSZip();

    // 1. Fetch all components dynamically from the Components folder
    const dynamicSections = getDynamicSections();

    // 2. Loop through sections and generate selected component files inside the ZIP
    AllSections.forEach((sectionName) => {
      const componentsArray = dynamicSections[sectionName];
      if (componentsArray && componentsArray.length > 1) {
        GenerateSectionFile(sectionName, componentsArray, zip, activeSelection);
      }
    });

    // 3. Process and include necessary font files based on user data
    const fontImports = await processAllFonts(zip, allData, activeSelection, AllSections);

    // 4. Generate all core React project files
    generateAllDataFile(zip, allData, activeSelection);
    generateAllLayoutFile(zip);
    generateAppFile(zip);
    generateIndexJsFile(zip, fontImports);
    generatePackageJsonFile(zip);
    generateIndexHtmlFile(zip);

    // 5. Compress and download the final ZIP file
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