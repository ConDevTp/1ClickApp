import { useContext, useEffect } from "react";
import { PanelContext } from "../Context/Context";
// فرض می‌کنیم این Header_1 شامل متن کد شماست
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { Header_3 } from "../Components/Headers/Header3/Header3";
import { Header_2 } from "../Components/Headers/Header2/Header2";
import { Header_1 } from "../Components/Headers/Header1/Header1";

const CodeExtractor = () => {
  const { allData, activeSelection } = useContext(PanelContext);

  //   THIS IS FOR JUST GET DATA HEADER
  const ff = activeSelection["Header"] || 1;
  const activeheader = "Header-" + ff;

  const formattedData = Object.entries(allData[activeheader])
    .map(([key, value]) => {
      const formattedValue = typeof value === "string" ? `"${value}"` : value;
      return `    ${key}: ${formattedValue},`;
    })
    .join("\n");

  const HeaderData = `export const HeadersData = { ${activeheader}: {\n${formattedData}\n  },
    };`;
  // جند مورد مینویسی مثلا هدر وفورت و انیا یه + میدی همه رو میریهی یه جا با هم میزنی که درست بشه
  //   THIS IS FOR JUST GET DATA HEADER

  //   -------------------------------

  // تابع اصلی برای ساخت فایل و دانلود
  const handleDownload = async () => {
    const zip = new JSZip();

    // 1. اضافه کردن فایل به زیپ
    // دقت کنید Header_1 باید یک String (متن کد) باشد
    // اضافه کردن یک مقدار خالی در ایندکس 0 برای هماهنگی
    const headersArray = [null, Header_1, Header_2, Header_3];

    const getSelectedHeader = () => {
      // اگر کاربر هدر 2 را انتخاب کرده باشد، activeNum عدد 2 است
      const activeNum = activeSelection["Header"];

      let selectedCode = "";

      // حالا حلقه از 1 شروع می‌شود
      for (let i = 1; i < headersArray.length; i++) {
        if (i === activeNum) {
          selectedCode = headersArray[i];
          break;
        }
      }

      return selectedCode;
    };

    // خروجی نهایی
    const finalHeaderCode = getSelectedHeader();

    zip.file(`${activeheader}.jsx`, finalHeaderCode);
    zip.file("AllData.js", HeaderData);

    // 2. ساخت فایل زیپ (حتما باید await باشد)
    const content = await zip.generateAsync({ type: "blob" });

    // 3. دانلود فایل
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
