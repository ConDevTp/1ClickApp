export const getBackgroundStyle = (data) => {
  if (!data) return {};
  
  let finalBgImage = data.backgroundImage || "none";
  
  if (data.overlayColor && data.overlayColor !== "rgba(0,0,0,0)" && data.backgroundImage && data.backgroundImage.includes('url')) {
    if (data.overlayColor.includes('gradient')) {
      finalBgImage = `${data.overlayColor}, ${data.backgroundImage}`;
    } else {
      finalBgImage = `linear-gradient(${data.overlayColor}, ${data.overlayColor}), ${data.backgroundImage}`;
    }
  }

  return {
    backgroundColor: data.backgroundColor || "transparent",
    backgroundImage: finalBgImage,
    backgroundSize: data.backgroundSize || "cover",
    backgroundPosition: data.backgroundPosition || "center",
    backgroundRepeat: data.backgroundRepeat || "no-repeat",
    backgroundAttachment: data.backgroundAttachment || "scroll",
  };
};