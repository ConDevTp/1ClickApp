const GenerateSectionFile = (sectionName, componentsArray, zip, activeSelection) => {
  
  // Get the selected component number or fallback to 1
  const activeNum = activeSelection[sectionName] || 1;
  const selectedItem = componentsArray[activeNum] || componentsArray[1];
  const { code, css } = selectedItem;

  // Build the final React component code string
  const cssImportLine = css ? `import "./index.css";\n` : "";
  const beforeCode = `import React from "react";\nimport { AllData } from "../../Data/AllData";\n${cssImportLine}const ${sectionName} = ({ id }) => {\n  const data = AllData[id];\n  if (!data) return null;`;
  const afterCode = `}; export default ${sectionName};`;
  const finalCode = beforeCode + code + afterCode;

  // Create the target folder path in the ZIP file
  const folder = zip
    .folder("myapp")
    .folder("src")
    .folder("Components")
    .folder(sectionName);
  
  // Inject the .jsx and .css files into the folder
  folder.file(`${sectionName}.jsx`, finalCode);
  if (css) folder.file(`index.css`, css);
};

export default GenerateSectionFile;