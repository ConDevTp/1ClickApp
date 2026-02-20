export const processImages = async (zip, allData, AllSections, activeSelection) => {
  const exportedData = JSON.parse(JSON.stringify(allData));
  const imgFolder = zip.folder("myapp").folder("public").folder("Images");
  
  // متغیرهای کنترلی که باید در کل پروسه در دسترس باشند
  const processedImages = {};
  let imgCounter = 1;

  const validKeys = ["image", "img", "logo", "background", "avatar", "thumbnail", "picture", "icon"];

  // این تابع باید حتماً داخل تابع اصلی باشد تا به متغیرهای بالا دسترسی داشته باشد
  const processImageField = async (val) => {
    if (typeof val !== "string" || !val) return val;

    let isUrlWrapped = false;
    let actualVal = val;

    // استخراج دیتای خالص از url() برای بک‌گراندها
    if (val.startsWith("url(") || val.startsWith("URL(")) {
      isUrlWrapped = true;
      actualVal = val.slice(4, -1).replace(/['"]/g, "");
    }

    let processedVal = actualVal;

    // ۱. پردازش Base64
    if (actualVal.startsWith("data:image/")) {
      if (processedImages[actualVal]) {
        processedVal = processedImages[actualVal];
      } else {
        const base64Data = actualVal.split(",")[1];
        let extension = actualVal.split(";")[0].split("/")[1] || "png";
        if (extension.includes("svg+xml")) extension = "svg";

        const fileName = `img-${imgCounter}.${extension}`;
        imgCounter++;

        imgFolder.file(fileName, base64Data, { base64: true });
        processedVal = `/Images/${fileName}`;
        processedImages[actualVal] = processedVal; // ذخیره در حافظه موقت برای جلوگیری از تکرار
      }
    } 
    // ۲. پردازش لینک‌ها یا Blobها
    else if (actualVal.startsWith("blob:") || actualVal.startsWith("/") || actualVal.startsWith("http")) {
      if (processedImages[actualVal]) {
        processedVal = processedImages[actualVal];
      } else {
        try {
          const response = await fetch(actualVal);
          const blobData = await response.blob();

          let extension = blobData.type.split("/")[1] || "png";
          if (extension.includes("svg")) extension = "svg";
          else if (extension === "jpeg") extension = "jpg";

          const fileName = `img-${imgCounter}.${extension}`;
          imgCounter++;

          imgFolder.file(fileName, blobData);
          processedVal = `/Images/${fileName}`;
          processedImages[actualVal] = processedVal;
        } catch (error) {
          processedVal = actualVal;
        }
      }
    }

    return isUrlWrapped ? `url(${processedVal})` : processedVal;
  };

  // حلقه اصلی برای پیمایش تمام سکشن‌ها
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