import React from "react";
import InputBox from "../../Components/UI/InputBox";
import SelectMenu from "../../Components/UI/SelectMenu";
import CustomColorPicker from "../../Components/UI/ColorPicker";

const ImageBg = ({ bgImage, bgSize, bgPosition, bgRepeat, bgAttachment, overlayColor, handleImageUpload, handleImageUrl, extractUrl, setValue }) => {
  const sizeOptions = [
    { label: 'پوشش کامل (Cover)', value: 'cover' },
    { label: 'محتوا کامل (Contain)', value: 'contain' },
    { label: 'سایز اصلی (Auto)', value: 'auto' }
  ];

  const positionOptions = [
    { label: 'وسط (Center)', value: 'center' },
    { label: 'بالا (Top)', value: 'top' },
    { label: 'پایین (Bottom)', value: 'bottom' }
  ];

  const repeatOptions = [
    { label: 'بدون تکرار', value: 'no-repeat' },
    { label: 'کاشی‌وار', value: 'repeat' },
    { label: 'افقی', value: 'repeat-x' },
    { label: 'عمودی', value: 'repeat-y' }
  ];

  const attachmentOptions = [
    { label: 'عادی (Scroll)', value: 'scroll' },
    { label: 'پارالاکس (Fixed)', value: 'fixed' }
  ];

  return (
    <div>
      <div className="ui-input-wrapper">
        <label className="ui-label">آپلود عکس</label>
        <input 
          type="file" 
          accept="image/*" 
          className="ui-input-field" 
          style={{ paddingTop: '6px' }} 
          onChange={handleImageUpload} 
        />
      </div>
      
      <InputBox
        label="یا لینک عکس"
        placeholder="https://..."
        value={extractUrl(bgImage)}
        onChange={(val) => handleImageUrl({ target: { value: val } })}
        rtl={false}
      />

      <CustomColorPicker 
        label="لایه روی عکس (Overlay)"
        value={overlayColor} 
        onChange={(c) => setValue("overlayColor", c)} 
      />
      
      <div className="ui-grid-2">
        <SelectMenu
          label="نحوه نمایش"
          options={sizeOptions}
          value={bgSize}
          onChange={(val) => setValue("backgroundSize", val)}
        />
        <SelectMenu
          label="موقعیت"
          options={positionOptions}
          value={bgPosition}
          onChange={(val) => setValue("backgroundPosition", val)}
        />
      </div>

      <div className="ui-grid-2">
        <SelectMenu
          label="تکرار"
          options={repeatOptions}
          value={bgRepeat}
          onChange={(val) => setValue("backgroundRepeat", val)}
        />
        <SelectMenu
          label="اسکرول"
          options={attachmentOptions}
          value={bgAttachment}
          onChange={(val) => setValue("backgroundAttachment", val)}
        />
      </div>
    </div>
  );
};

export default ImageBg;