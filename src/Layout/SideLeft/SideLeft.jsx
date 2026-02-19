import { useContext } from "react";
import { PanelContext } from "../../Context/Context";
import { useAllData } from "../../Hooks/useAllData";
import "./index.css";
import "../Layout.css";

const SideLeft = () => {
  const { activeItem, setActiveItem } = useContext(PanelContext);
  const { value, setValue, resetItem, isDirty } = useAllData(activeItem);

  const renderInput = (key, val) => {
    // ۱. آی‌دی نباید ویرایش شود
    if (key === "id") return null;

    // ۲. جلوگیری از کرش روی آرایه‌ها (مثل لیست لینک‌ها در هدر ۲)
    // فعلاً آرایه‌ها و آبجکت‌ها را نادیده می‌گیریم تا پنل خراب نشود
    if (Array.isArray(val) || (typeof val === "object" && val !== null))
      return null;

    // ۳. اینپوت‌های رنگ (متن و پس‌زمینه)
    if (key.toLowerCase().includes("color")) {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            {key === "textColor" ? "رنگ متن" : "رنگ پس‌زمینه"}
          </label>
          <input
            type="color"
            className="form-control form-control-color w-100"
            value={val || "#000000"}
            onChange={(e) => setValue(key, e.target.value)}
          />
        </div>
      );
    }

    if (key.toLowerCase().includes("image") || key.toLowerCase().includes("img") || key.toLowerCase().includes("logo")) {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            {key === "image" ? "تصویر" : key === "logo" ? "لوگو" : "عکس"}
          </label>
          
          {val && typeof val === "string" && (
            <div className="mb-2 text-center">
              <img 
                src={val} 
                alt="preview" 
                className="img-thumbnail bg-dark border-secondary" 
                style={{ maxHeight: '80px', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; }}
                onLoad={(e) => { e.target.style.display = 'inline-block'; }}
              />
            </div>
          )}
          
          <input
            type="text"
            className="form-control form-control-sm bg-dark text-white border-secondary mb-2"
            placeholder="لینک عکس را اینجا وارد کنید..."
            value={typeof val === "string" && !val.startsWith("data:image") ? val : ""}
            onChange={(e) => setValue(key, e.target.value)}
          />

<input
  type="file"
  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
  className="form-control form-control-sm bg-dark text-white border-secondary"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("فقط فرمت‌های JPG, PNG, WEBP, SVG و GIF مجاز هستند.");
        e.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("حجم عکس نباید بیشتر از ۲ مگابایت باشد.");
        e.target.value = "";
        return;
      }

      if (typeof val === "string" && val.startsWith("blob:")) {
        URL.revokeObjectURL(val);
      }

      const objectUrl = URL.createObjectURL(file);
      setValue(key, objectUrl);
    }
  }}
/>
        </div>
      );
    }

    // ۴. اسلایدر ارتفاع خط
    if (key === "lineHeight") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            فاصله خطوط ({val})
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="3"
            step="0.1"
            value={val || 1.5}
            onChange={(e) => setValue(key, e.target.value)}
          />
        </div>
      );
    }

    // ۵. انتخاب فونت (با لیست جدید و استاندارد شما)
    if (key === "fontFamily") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">فونت</label>
          <select
            className="form-select bg-dark text-white border-secondary"
            value={val}
            onChange={(e) => setValue(key, e.target.value)}
            style={{ fontFamily: val }}
          >
            <option value="Anjoman" style={{ fontFamily: "Anjoman" }}>
              انجمن (Anjoman)
            </option>
            <option value="IRANYekan" style={{ fontFamily: "IRANYekan" }}>
              ایران یکان (IRANYekan)
            </option>
            <option value="IRANSansX" style={{ fontFamily: "IRANSansX" }}>
              ایران سنس (IRANSansX)
            </option>
            <option value="Shabnam" style={{ fontFamily: "Shabnam" }}>
              شبنم (Shabnam)
            </option>
            <option value="Vazirmatn" style={{ fontFamily: "Vazirmatn" }}>
              وزیر متن (Vazirmatn)
            </option>
            <option value="Vazir" style={{ fontFamily: "Vazir" }}>
              وزیر (Vazir)
            </option>
            <option value="Rokh" style={{ fontFamily: "Rokh" }}>
              رخ (Rokh)
            </option>
            <option value="Tahoma" style={{ fontFamily: "Tahoma" }}>
              تاهما (Tahoma)
            </option>
            <option value="Arial" style={{ fontFamily: "Arial" }}>
              Arial
            </option>
          </select>
        </div>
      );
    }

    // ۶. اسلایدر سایز فونت
    if (key === "fontSize") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            سایز فونت ({parseInt(val)})
          </label>
          <input
            type="range"
            className="form-range"
            min="12"
            max="60"
            value={parseInt(val) || 16}
            onChange={(e) => setValue(key, e.target.value + "px")}
          />
        </div>
      );
    }

    // ۷. اینپوت برای ارتفاع (Height) - اختیاری اگر می‌خواهید دستی تنظیم شود
    if (key === "height") {
      return null; // معمولاً ارتفاع اتوماتیک است، پس نشان نمی‌دهیم
    }

    // اضافه کردن تنظیم ضخامت قلم
    if (key === "fontWeight") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            ضخامت قلم
          </label>
          <select
            className="form-select bg-dark text-white border-secondary"
            value={val}
            onChange={(e) => setValue(key, e.target.value)}
            style={{ fontWeight: val }} // پیش‌نمایش ضخامت توی خود لیست
          >
            <option value="300" style={{ fontWeight: 300 }}>
              نازک (Light)
            </option>
            <option value="400" style={{ fontWeight: 400 }}>
              معمولی (Regular)
            </option>
            <option value="700" style={{ fontWeight: 700 }}>
              ضخیم (Bold)
            </option>
          </select>
        </div>
      );
    }

    // ۸. اینپوت‌های متنی معمولی (مثل Title, Brand, Placeholder)
    return (
      <div key={key} className="mb-3">
        <label className="form-label d-block small text-muted">
          {/* ترجمه ساده لیبل‌ها */}
          {key === "title"
            ? "عنوان"
            : key === "subtitle"
              ? "زیرعنوان"
              : key === "brand"
                ? "نام برند"
                : key === "searchPlaceholder"
                  ? "متن جایگزین جستجو"
                  : key === "searchBtnText"
                    ? "متن دکمه جستجو"
                    : key}
        </label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          value={val || ""}
          onChange={(e) => setValue(key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <aside className="SideLeft border-end p-3">
      {activeItem ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="m-0 text-info">تنظیمات: {activeItem}</h6>
            <button
              className="btn btn-sm btn-close btn-close-white"
              onClick={() => setActiveItem(null)}
            ></button>
          </div>

          {value && Object.keys(value).length > 0 ? (
            <div className="edit-form">
              {Object.entries(value).map(([key, val]) => renderInput(key, val))}

              {isDirty && (
                <button
                  className="btn btn-warning btn-sm w-100 mt-4"
                  onClick={resetItem}
                >
                  بازگرداندن تغییرات این بخش
                </button>
              )}
            </div>
          ) : (
            <div className="alert alert-dark small">
              دیتایی برای این بخش یافت نشد.
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-muted mt-5">
          <p className="small">
            برای شروع ویرایش، روی یکی از بخش‌های سایت کلیک کنید.
          </p>
        </div>
      )}
    </aside>
  );
};

export default SideLeft;
