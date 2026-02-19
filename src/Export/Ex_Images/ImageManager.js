export const processImages = async (zip, allData, AllSections, activeSelection) => {
  const exportedData = JSON.parse(JSON.stringify(allData));
  const imgFolder = zip.folder("myapp").folder("public").folder("Images");
  const processedImages = {};
  let imgCounter = 1;

  const validKeys = ["image", "img", "logo", "background", "avatar", "thumbnail", "picture", "icon"];

  const processImageField = async (val) => {
    if (typeof val !== "string" || !val) return val;

    if (val.startsWith("data:image/")) {
      if (processedImages[val]) return processedImages[val];
      
      const base64Data = val.split(",")[1];
      let extension = val.split(";")[0].split("/")[1] || "png";
      if (extension === "svg+xml") extension = "svg";
      
      const fileName = `img-${imgCounter}.${extension}`;
      imgCounter++;
      
      imgFolder.file(fileName, base64Data, { base64: true });
      const newPath = `/Images/${fileName}`;
      processedImages[val] = newPath;
      return newPath;
    }

    if (val.startsWith("blob:") || val.startsWith("/") || val.startsWith("http")) {
      if (processedImages[val]) return processedImages[val];
      
      try {
        const response = await fetch(val);
        const blobData = await response.blob();
        
        let extension = blobData.type.split("/")[1] || "png";
        if (extension.includes("svg")) extension = "svg";
        else if (extension.includes("icon") || extension.includes("x-icon")) extension = "ico";
        else if (extension === "jpeg") extension = "jpg";

        const fileName = `img-${imgCounter}.${extension}`;
        imgCounter++;
        
        imgFolder.file(fileName, blobData);
        
        const newPath = `/Images/${fileName}`;
        processedImages[val] = newPath;
        return newPath;
      } catch (error) {
        return val;
      }
    }
    return val;
  };

  for (const sec of AllSections) {
    const activeNum = activeSelection[sec] || 1;
    const activeId = `${sec}-${activeNum}`;
    const sectionData = exportedData[activeId];

    if (sectionData) {
      for (const key of Object.keys(sectionData)) {
        const isImageKey = validKeys.some(k => key.toLowerCase().includes(k));
        
        if (isImageKey && sectionData[key]) {
          if (Array.isArray(sectionData[key])) {
            const newArray = [];
            for (const item of sectionData[key]) {
              newArray.push(await processImageField(item));
            }
            sectionData[key] = newArray;
          } else {
            sectionData[key] = await processImageField(sectionData[key]);
          }
        }
      }
    }
  }

  return exportedData;
};