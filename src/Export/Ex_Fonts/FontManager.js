import { FontExport } from "./FontsExport";

export const processAllFonts = async (zip, allData, activeSelection, sectionsList) => {
  
  // 1. Store unique font names to avoid duplicates
  const uniqueFonts = new Set();
  const listToCheck = sectionsList || []; 

  // 2. Loop through all sections to find used fonts
  listToCheck.forEach((sectionName) => {
    const selectedId = activeSelection[sectionName];
    if (selectedId) {
      // Create key (e.g., "Header-1")
      const fullKey = `${sectionName}-${selectedId}`;
      // Get font family from data
      const fontName = allData[fullKey]?.fontFamily;
      if (fontName) {
        uniqueFonts.add(fontName);
      }
    }
  });

  // 3. Default fallback if no font is found
  if (uniqueFonts.size === 0) {
    uniqueFonts.add("Rokh");
  }

  let importsString = "";
  
  // 4. Process unique fonts in parallel
  const fontPromises = Array.from(uniqueFonts).map(async (fontName) => {
    // Add font to zip and get import string
    const importLine = await FontExport(zip, fontName);
    importsString += importLine + "\n";
  });

  // Wait for all fonts to finish processing
  await Promise.all(fontPromises);

  // 5. Return all import lines
  return importsString;
};