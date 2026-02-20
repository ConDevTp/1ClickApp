export const generateStyleHelpersFile = (zip) => {
const StyleHelpersFile = `export const getBackgroundStyle = (data) => {
  if (!data) return {};
  
  let finalBgImage = data.backgroundImage || "none";
  
  if (data.overlayColor && data.overlayColor !== "rgba(0,0,0,0)" && data.backgroundImage && data.backgroundImage.includes('url')) {
    if (data.overlayColor.includes('gradient')) {
      finalBgImage = \`\${data.overlayColor}, \${data.backgroundImage}\`;
    } else {
      finalBgImage = \`linear-gradient(\${data.overlayColor}, \${data.overlayColor}), \${data.backgroundImage}\`;
    }
  }

  return {
    color: data.textColor || "inherit",
    backgroundColor: data.backgroundColor || "transparent",
    backgroundImage: finalBgImage,
    backgroundSize: data.backgroundSize || "cover",
    backgroundPosition: data.backgroundPosition || "center",
    backgroundRepeat: data.backgroundRepeat || "no-repeat",
    backgroundAttachment: data.backgroundAttachment || "scroll",
    fontSize: data.fontSize || "inherit",
    fontFamily: data.fontSelection || "inherit",
    lineHeight: data.fontHeight || "normal"
  };
};`;
  zip.folder("myapp").folder("src").folder("Utils").file("styleHelpers.js", StyleHelpersFile);
};