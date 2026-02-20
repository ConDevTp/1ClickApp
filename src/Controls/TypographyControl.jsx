import React from "react";
import SectionHeader from "../Components/UI/SectionHeader";
import CustomColorPicker from "../Components/UI/ColorPicker";
import SelectMenu from "../Components/UI/SelectMenu";
import CompactSlider from "../Components/UI/CompactSlider";

const TypographyControl = ({ data, setValue }) => {
  const hasTypography = data.fontFamily !== undefined || 
                        data.fontSize !== undefined || 
                        data.fontWeight !== undefined || 
                        data.lineHeight !== undefined || 
                        data.color !== undefined;

  if (!hasTypography) return null;

  const fontOptions = [
    { label: 'انجمن (Anjoman)', value: 'Anjoman' },
    { label: 'ایران یکان (IRANYekan)', value: 'IRANYekan' },
    { label: 'ایران سنس (IRANSansX)', value: 'IRANSansX' },
    { label: 'شبنم (Shabnam)', value: 'Shabnam' },
    { label: 'وزیر متن (Vazirmatn)', value: 'Vazirmatn' },
    { label: 'وزیر (Vazir)', value: 'Vazir' },
    { label: 'رخ (Rokh)', value: 'Rokh' },
    { label: 'تاهما (Tahoma)', value: 'Tahoma' },
    { label: 'Arial', value: 'Arial' }
  ];

  const weightOptions = [
    { label: 'نازک (Light)', value: '300' },
    { label: 'معمولی (Regular)', value: '400' },
    { label: 'ضخیم (Bold)', value: '700' }
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <SectionHeader title="تایپوگرافی" />
      
      {data.color !== undefined && (
        <CustomColorPicker 
          label="رنگ متن"
          value={data.color || "rgba(0,0,0,1)"}
          onChange={(color) => setValue("color", color)}
        />
      )}

      {data.fontFamily !== undefined && (
        <SelectMenu 
          label="فونت"
          options={fontOptions}
          value={data.fontFamily}
          onChange={(val) => setValue("fontFamily", val)}
        />
      )}

      {data.fontWeight !== undefined && (
        <SelectMenu 
          label="ضخامت قلم"
          options={weightOptions}
          value={String(data.fontWeight)}
          onChange={(val) => setValue("fontWeight", val)}
        />
      )}

      {data.fontSize !== undefined && (
        <CompactSlider
          label="سایز فونت"
          min={12}
          max={60}
          step={1}
          value={parseInt(data.fontSize) || 16}
          onChange={(val) => setValue("fontSize", val + "px")}
          unit="px"
        />
      )}

      {data.lineHeight !== undefined && (
        <CompactSlider
          label="فاصله خطوط"
          min={1}
          max={3}
          step={0.1}
          value={parseFloat(data.lineHeight) || 1.5}
          onChange={(val) => setValue("lineHeight", val)}
        />
      )}
    </div>
  );
};

export default TypographyControl;