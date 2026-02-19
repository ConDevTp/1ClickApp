export const generateIndexJsFile = (zip, fontImports) => {
  const IndexFile = `import React from "react"; 
import { createRoot } from "react-dom/client";
import App from "./App"; 
${fontImports} 
const root = createRoot(document.getElementById("root"));
root.render(<App />);`;
  zip.folder("myapp").folder("src").file("index.js", IndexFile);
};