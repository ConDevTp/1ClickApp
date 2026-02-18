/* eslint-disable import/no-webpack-loader-syntax */
import Anjoman from "!!raw-loader!../../Assets/Css/Anjoman.css";
import Rokh from "!!raw-loader!../../Assets/Css/Rokh.css";
import Vazir from "!!raw-loader!../../Assets/Css/Vazir.css";
import Vazirmatn from "!!raw-loader!../../Assets/Css/Vazirmatn.css";
import IRANSansX from "!!raw-loader!../../Assets/Css/IRANSansX.css";
import IRANYekan from "!!raw-loader!../../Assets/Css/IRANYekan.css";
import Shabnam from "!!raw-loader!../../Assets/Css/Shabnam.css";

const allFontFiles = require.context("../../Assets/Fonts", false, /\.woff2$/);

export const FontExport = async (zip, RequestedFontName) => {
    
    // 1. Define Source of Truth
    // Add "IRANSans" here mapping to IRANSansX content to avoid "if" statements
    const FontCssMap = {
      "Rokh": Rokh,
      "Vazir": Vazir,
      "Vazirmatn": Vazirmatn,
      "IRANSansX": IRANSansX,
      "IRANSans": IRANSansX, // <--- Solves the naming issue cleanly
      "IRANYekan": IRANYekan,
      "Shabnam": Shabnam,
      "Anjoman": Anjoman
    };

    // 2. Validation Logic
    // If requested font exists in map, keep it. If not, switch entirely to "Rokh".
    let FinalFontName = RequestedFontName;
    
    if (!FontCssMap[FinalFontName]) {
        FinalFontName = "Rokh";
    }

    // From now on, we ONLY use FinalFontName.
    // This ensures CSS content matches the Font Files matches the Filename.

    // 3. Setup Folders
    const assetsFolder = zip.folder("myapp").folder("src").folder("Assets");
    
    // 4. Get CSS Content
    const selectedCss = FontCssMap[FinalFontName];
    // Save as FinalFontName.css (e.g., Rokh.css or IRANSans.css)
    assetsFolder.folder("Css").file(`${FinalFontName}.css`, selectedCss);

    // 5. Process Font Files
    const fontFilesKeys = allFontFiles.keys();
    const fontsFolder = assetsFolder.folder("Fonts");

    // We need to map the internal name (IRANSansX) back to file system if needed.
    // Since we mapped "IRANSans" to "IRANSansX" content, we might need a small check for file prefixes.
    // To keep it 100% generic, we rely on the FinalFontName prefix.
    // NOTE: If FinalFontName is "IRANSans" but files are "IRANSansX-...", we need to handle that mapping or rename files.
    // Best practice: The key in the map should match the file prefix.
    
    // Let's refine FinalFontName to be the "System Name" (IRANSansX)
    if (FinalFontName === "IRANSans") FinalFontName = "IRANSansX"; 

    const downloadPromises = fontFilesKeys.map(async (key) => {
        const fileName = key.replace('./', ''); 
        
        // Strict check: Must start with the FINAL decided name
        if (fileName.startsWith(FinalFontName + "-")) {
            const fileUrl = allFontFiles(key);
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            fontsFolder.file(fileName, blob);
        }
    });

    await Promise.all(downloadPromises);

    // 6. Return consistent import path
    return `import "./Assets/Css/${FinalFontName}.css";`;
};