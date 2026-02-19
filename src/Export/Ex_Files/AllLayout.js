import { AllSections } from "../AllSections"; // آدرس فایل رو چک کن درست باشه

export const generateAllLayoutFile = (zip) => {
  // Generate component imports dynamically (e.g., import Header from "./Header/Header";)
  const componentImports = AllSections.map(sec => `import ${sec} from "./${sec}/${sec}";`).join("\n");

  // Generate data imports dynamically (e.g., import { HeadersData, FootersData } from "../Data/AllData";)
  const dataImportNames = AllSections.map(sec => `${sec}sData`).join(", ");
  const dataImports = `import { ${dataImportNames} } from "../Data/AllData";`;

  // Generate ID variables dynamically (e.g., const HeaderID = HeadersData[...].id;)
  const idDeclarations = AllSections.map(sec => `  const ${sec}ID = ${sec}sData[Object.keys(${sec}sData)[0]].id;`).join("\n");

  // Generate JSX tags dynamically (e.g., <Header id={HeaderID} />)
  const jsxComponents = AllSections.map(sec => `      <${sec} id={${sec}ID} />`).join("\n");

  // Combine everything into the final React component code
  const AllLayout = `import React from "react";
${componentImports}
${dataImports}

const AllLayout = () => {
${idDeclarations}

  return (
    <div className="mx-auto container-lg" style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
${jsxComponents}
    </div>
  );
};

export default AllLayout;`;

  // Create the AllLayout.jsx file inside the ZIP
  zip.folder("myapp").folder("src").folder("Components").file("AllLayout.jsx", AllLayout);
};