import { AllSections } from "./AllSections";

// Automatically scan the entire 'Components' folder for .js/.jsx files
const req = require.context("../Components", true, /\.jsx?$/);

export const getDynamicSections = () => {
  const sectionArrays = {};

  // Initialize empty arrays (with null at index 0) for each section type
  AllSections.forEach((sec) => {
    sectionArrays[sec] = [null]; 
  });

  // Iterate over all discovered files
  req.keys().forEach((key) => {

    AllSections.forEach((sec) => {
      // Create plural folder name (e.g., "Header" -> "Headers")
      const folderName = `${sec}s`; 

      // Process file ONLY if it belongs to the matched folder
      if (key.startsWith(`./${folderName}/`)) {
        const module = req(key);

        Object.keys(module).forEach((exportName) => {
          // Find exports matching the specific pattern (e.g., "Header_1")
          const match = exportName.match(new RegExp(`^${sec}_(\\d+)$`));
          
          if (match) {
            const num = parseInt(match[1], 10);
            
            // Prevent undefined errors by initializing the object
            if (!sectionArrays[sec][num]) {
              sectionArrays[sec][num] = { code: null, css: null };
            }

            // Store the React JSX code string
            sectionArrays[sec][num].code = module[exportName];
            
            // Store the raw CSS string if available
            if (module[`${exportName}_CSS`]) {
              sectionArrays[sec][num].css = module[`${exportName}_CSS`];
            }
          }
        });
      }
    });
  });

  return sectionArrays;
};