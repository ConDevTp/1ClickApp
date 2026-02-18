import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import useGetAllExportData from "./useGetAllExportData"; 

import { Header_3 } from "../Components/Headers/Header-3/Header3";
import { Header_2 } from "../Components/Headers/Header-2/Header2";
import { Header_1 } from "../Components/Headers/Header-1/Header1";

import { Footer_1 } from "../Components/Footers/Footer-1/Footer1";
import { Footer_2 } from "../Components/Footers/Footer-2/Footer2";
import { processAllFonts } from "./Ex_Fonts/FontManager";




const CodeExtractor = () => {
  // استفاده از هوک جدید
  const AllDataForExport = useGetAllExportData();
  const { activeSelection , allData } = useContext(PanelContext);

  const handleDownload = async () => {
    const zip = new JSZip();
    
    // ______________________________________________________________________________________________________________________________
    // START All For Header
    const headersArray = [null, Header_1, Header_2, Header_3];
    const getSelectedHeader = () => {
      const activeNum = activeSelection["Header"] || 1; // اضافه کردن پیش‌فرض ۱
      let selectedCode = headersArray[1]; // پیش‌فرض
      for (let i = 1; i < headersArray.length; i++) {
        if (i === activeNum) {
          selectedCode = headersArray[i];
          break;
        }
      }
      return selectedCode || headersArray[1];
    };

    const ReturnFileHeader = getSelectedHeader();
    const BeforeHeader = `import React from "react";
import { AllData } from "../../Data/AllData";
const Header = ({ id }) => {
  const data = AllData[id];
  if (!data) return null;`; // پرانتز باز برای JSX
    
    const AfterHeader = `}; export default Header; `;

    const finalHeaderCode = BeforeHeader + ReturnFileHeader + AfterHeader;
    
    // Create Header File
    zip
      .folder("myapp")
      .folder("src")
      .folder("Components")
      .folder("Header")
      .file(`Header.jsx`, finalHeaderCode);
    // END All For Header
    
    // ______________________________________________________________________________________________________________________________
    // START All For Footer
    const footersArray = [null, Footer_1, Footer_2];

    const getSelectedFooter = () => {
      const activeNum = activeSelection["Footer"] || 1;
      let selectedCode = footersArray[1];
      for (let i = 1; i < footersArray.length; i++) {
        if (i === activeNum) {
          selectedCode = footersArray[i];
          break;
        }
      }
      return selectedCode || footersArray[1];
    };
    
    const ReturnFileFooter = getSelectedFooter();
    const BeforeFooter = `import React from "react";
import { AllData } from "../../Data/AllData";
const Footer = ({ id }) => {
  const data = AllData[id];
  if (!data) return null;`;
  
    const AfterFooter = `}; export default Footer; `;
    
    const finalFooterCode = BeforeFooter + ReturnFileFooter + AfterFooter;
    
    // Create Footer File
    zip
      .folder("myapp")
      .folder("src")
      .folder("Components")
      .folder("Footer")
      .file(`Footer.jsx`, finalFooterCode);
    // END All For Footer
    // ______________________________________________________________________________________________________________________________
    // For Font File
const sectionsToCheck = [
        "Header", 
        "Footer", 
    ];

    const fontImports = await processAllFonts(zip, allData, activeSelection, sectionsToCheck);
    // ______________________________________________________________________________________________________________________________
    // All Data File
    zip
      .folder("myapp")
      .folder("src")
      .folder("Data")
      .file("AllData.js", AllDataForExport);
    
    // ______________________________________________________________________________________________________________________________
    // Create File AllLayout
    const AllLayout = `import React from "react"; import { FootersData, HeadersData } from "../Data/AllData"; import Footer from "./Footer/Footer"; import Header from "./Header/Header"; const AllLayout = () => { const HeaderID = HeadersData[Object.keys(HeadersData)[0]].id; const FooterID = FootersData[Object.keys(FootersData)[0]].id; return ( <div className="mx-auto container-lg" style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}> <Header id={HeaderID} /> <div style={{flex:1}}></div> <Footer id={FooterID} /> </div> ); }; export default AllLayout;`;
    
    zip
      .folder("myapp")
      .folder("src")
      .folder("Components")
      .file("AllLayout.jsx", AllLayout);
    
    // ______________________________________________________________________________________________________________________________
    // Create File App.js (بوت‌استرپ رو اینجا اضافه کردم)
const AppFile = `import "bootstrap/dist/css/bootstrap.min.css"; import "bootstrap/dist/js/bootstrap.bundle.min"; import AllLayout from "./Components/AllLayout"; function App() {return <AllLayout />;} export default App;`;

zip.folder("myapp").folder("src").file("App.js", AppFile);
    
    // ______________________________________________________________________________________________________________________________
    // Create File Index.js
    const IndexFile = `import React from "react"; 
import { createRoot } from "react-dom/client";
import App from "./App"; 
${fontImports} 
const root = createRoot(document.getElementById("root"));
root.render(<App />);`;
    
    zip.folder("myapp").folder("src").file("index.js", IndexFile);
    
    // ______________________________________________________________________________________________________________________________
    // Create File Package.json (تمیز شده)
    const PackageJson = {
      "name": "myapp",
      "version": "0.1.0",
      "private": true,
      "dependencies": {
        "bootstrap": "^5.3.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-scripts": "5.0.1",
        "react-icons": "^5.0.0",
        "web-vitals": "^2.1.0"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build"
      },
      "browserslist": {
        "production": [">0.2%", "not dead", "not op_mini all"],
        "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
      }
    };
    
    zip.folder("myapp").file("package.json", JSON.stringify(PackageJson, null, 2));
    
    // ______________________________________________________________________________________________________________________________
    // Create File Index.html
    const IndexHTML = `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>React App</title></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`;
    
    zip.folder("myapp").folder("public").file("index.html", IndexHTML);
    
    // ______________________________________________________________________________________________________________________________
    // Zip Generator
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