import React from "react";
import SectionHeader from "../Components/UI/SectionHeader";
import InputBox from "../Components/UI/InputBox";

const ImageControl = ({ data, setValue }) => {
  const imageKeys = Object.keys(data).filter(key => 
    key.toLowerCase().includes("image") || 
    key.toLowerCase().includes("img") || 
    key.toLowerCase().includes("logo")
  );

  const filteredKeys = imageKeys.filter(key => key !== "backgroundImage");

  if (filteredKeys.length === 0) return null;

  return (
    <>
      {filteredKeys.map((key) => {
        const val = data[key];
        const labelText = key === "logo" ? "لوگو" : "تصویر";

        return (
          <div key={key} style={{ marginBottom: '20px' }}>
            <SectionHeader title={labelText} />
            
            {val && typeof val === "string" && (
              <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                <img 
                  src={val} 
                  alt="preview" 
                  style={{ maxHeight: '80px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--ui-border)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                  onLoad={(e) => { e.target.style.display = 'inline-block'; }}
                />
              </div>
            )}
            
            <InputBox 
              label="لینک عکس"
              placeholder="https://..."
              value={typeof val === "string" && !val.startsWith("data:image") && !val.startsWith("blob:") ? val : ""}
              onChange={(newVal) => setValue(key, newVal)}
              rtl={false}
            />

            <div className="ui-input-wrapper">
              <label className="ui-label">آپلود از سیستم</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                className="ui-input-field"
                style={{ paddingTop: '6px' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
                    if (!validTypes.includes(file.type)) return;
                    if (file.size > 2 * 1024 * 1024) return;
                    
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setValue(key, reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ImageControl;