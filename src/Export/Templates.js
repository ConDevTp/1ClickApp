import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { Header_3 } from "../Components/Headers/Header-3/Header3";
import { Header_2 } from "../Components/Headers/Header-2/Header2";
import { Header_1 } from "../Components/Headers/Header-1/Header1";
import GetAllExportData from "./GetAllExportData";
import { Footer_1 } from "../Components/Footers/Footer-1/Footer1";
import { Footer_2 } from "../Components/Footers/Footer-2/Footer2";

const CodeExtractor = () => {
  const AllDataForExport = GetAllExportData();
  // ------------------
  const { activeSelection } = useContext(PanelContext);

  //   -------------------------------

  const handleDownload = async () => {
    const zip = new JSZip();
    // ______________________________________________________________________________________________________________________________
    // START All For Header
    const headersArray = [null, Header_1, Header_2, Header_3];
    const getSelectedHeader = () => {
      const activeNum = activeSelection["Header"];
      let selectedCode = "";
      for (let i = 1; i < headersArray.length; i++) {
        if (i === activeNum) {
          selectedCode = headersArray[i];
          break;
        }
      }
      return selectedCode;
    };

    const RreturnFileHeader = getSelectedHeader();
    const BeforeHeader = `import { AllData } from "../../Data/AllData";
                          const Header = ({ id }) => {
                          const data = AllData[id];
                          if (!data) return null;`;
    const AfterHeader = `}; export default Header; `;

    const finalHeaderCode = BeforeHeader + RreturnFileHeader + AfterHeader;
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
      const activeNum = activeSelection["Footer"];
      let selectedCode = "";
      for (let i = 1; i < footersArray.length; i++) {
        if (i === activeNum) {
          selectedCode = footersArray[i];
          break;
        }
      }
      return selectedCode;
    };
    const RreturnFileFooter = getSelectedFooter();
    const BeforeFooter = `import { AllData } from "../../Data/AllData";
                          const Footer = ({ id }) => {
                          const data = AllData[id];
                          if (!data) return null;`;
    const AfterFooter = `}; export default Footer; `;
    const finalFooterCode = BeforeFooter + RreturnFileFooter + AfterFooter;
    // Create Footer File
    zip
      .folder("myapp")
      .folder("src")
      .folder("Components")
      .folder("Footer")
      .file(`Footer.jsx`, finalFooterCode);
    // END All For Footer
    // ______________________________________________________________________________________________________________________________
    // All Data File
    zip
      .folder("myapp")
      .folder("src")
      .folder("Data")
      .file("AllData.js", AllDataForExport);
    // ______________________________________________________________________________________________________________________________
    // Create File AllLayout
    const AllLayout = `import { FootersData, HeadersData } from "../Data/AllData"; import Footer from "./Footer/Footer"; import Header from "./Header/Header"; const AllLayout = () => { const HeaderID = HeadersData[Object.keys(HeadersData)[0]].id; const FooterID = FootersData[Object.keys(FootersData)[0]].id; return ( <> <Header id={HeaderID} /> <Footer id={FooterID} /> </> ); }; export default AllLayout;`;
    zip
      .folder("myapp")
      .folder("src")
      .folder("Components")
      .file("AllLayout.jsx", AllLayout);
    // ______________________________________________________________________________________________________________________________
    // Create File App.js
    const AppFile = `import AllLayout from "./Components/AllLayout";function App() {return <AllLayout />;}export default App;`;
    zip.folder("myapp").folder("src").file("App.js", AppFile);
    // ______________________________________________________________________________________________________________________________
    // Create File Index.js
    const IndexFile = `import { createRoot } from "react-dom/client";import App from "./App";const root = createRoot(document.getElementById("root"));root.render(<App />);`;
    zip.folder("myapp").folder("src").file("index.js", IndexFile);
    // ______________________________________________________________________________________________________________________________
    // Create File Package.json
    const PackageJson = `{"name":"myapp","version":"0.1.0","private":true,"dependencies":{"@testing-library/dom":"^10.4.1","@testing-library/jest-dom":"^6.9.1","@testing-library/react":"^16.3.2","@testing-library/user-event":"^13.5.0","bootstrap":"^5.3.8","framer-motion":"^12.23.25","react":"^19.2.4","react-dom":"^19.2.4","react-icons":"^5.5.0","react-scripts":"5.0.1","swiper":"^12.1.0","web-vitals":"^2.1.4"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}`;
    zip.folder("myapp").file("package.json", PackageJson);
    // ______________________________________________________________________________________________________________________________
    // Create File Index.html
    const IndexHTML = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>React App</title></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`;
    zip.folder("myapp").folder("public").file("index.html", IndexHTML);
    // ______________________________________________________________________________________________________________________________
    // Zip Generator
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "SourceCode.zip");
    // ______________________________________________________________________________________________________________________________
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
