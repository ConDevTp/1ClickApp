import { useContext } from "react";
import { PanelContext } from "../../Context/Context";
import { useAllData } from "../../Hooks/useAllData";
import "./index.css";
import "../Layout.css";

const SideLeft = () => {
  const { activeItem, setActiveItem } = useContext(PanelContext);
  const { value, setValue, resetItem, isDirty } = useAllData(activeItem);

  const renderInput = (key, val) => {
    if (key === "id") return null;

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
            max="4"
            step="0.1"
            value={val || 1.2}
            onChange={(e) => setValue(key, e.target.value)}
          />
        </div>
      );
    }

    if (key === "fontFamily") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">فونت</label>
          <select
            className="form-select bg-dark text-white border-secondary"
            value={val}
            onChange={(e) => setValue(key, e.target.value)}
          >
            <option value="IRANSans">ایران‌سنس</option>
            <option value="Yekan">یکان</option>
            <option value="Tahoma">تاهما</option>
            <option value="Arial">Arial</option>
          </select>
        </div>
      );
    }

    if (key === "fontSize") {
      return (
        <div key={key} className="mb-3">
          <label className="form-label d-block small text-muted">
            سایز فونت ({val})
          </label>
          <input
            type="range"
            className="form-range"
            min="12"
            max="100"
            value={parseInt(val) || 16}
            onChange={(e) => setValue(key, e.target.value + "px")}
          />
        </div>
      );
    }

    return (
      <div key={key} className="mb-3">
        <label className="form-label d-block small text-muted">{key}</label>
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
              دیتایی برای این بخش تعریف نشده است.
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
