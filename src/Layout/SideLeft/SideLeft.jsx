import { useContext } from "react";
import { PanelContext } from "../../Context/Context";
import { useAllData } from "../../Hooks/useAllData";
import "./index.css";
import "../Layout.css";
import BackgroundControl from "../../Controls/BackgroundControl/BackgroundControl";
import ImageControl from "../../Controls/ImageControl";
import TypographyControl from "../../Controls/TypographyControl";
import ContentControl from "../../Controls/ContentControl";

const SideLeft = () => {
  const { activeItem, setActiveItem } = useContext(PanelContext);
  const { value, setValue, resetItem, isDirty } = useAllData(activeItem);

  const hasBackground =
    value &&
    (value.backgroundColor !== undefined ||
      value.backgroundImage !== undefined);

  return (
    <aside className="SideLeft p-3">
      {activeItem ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6
              className="m-0 text-info"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              تنظیمات: {activeItem}
            </h6>
            <button
              className="btn btn-sm btn-close"
              onClick={() => setActiveItem(null)}
            ></button>
          </div>

          {value && Object.keys(value).length > 0 ? (
            <div className="edit-form">
              <div className="bg-light px-3 py-2">
                {hasBackground && (
                  <BackgroundControl data={value} setValue={setValue} />
                )}
              </div>
              <div className="bg-light px-3 py-2 mt-3">
                <ImageControl data={value} setValue={setValue} />
              </div>
              <div className="bg-light px-3 py-2 mt-3">
                <TypographyControl data={value} setValue={setValue} />
              </div>
              <div className="bg-light px-3 py-2 mt-3">
                <ContentControl data={value} setValue={setValue} />
              </div>

              {isDirty && (
                <button
                  className="btn btn-warning btn-sm w-100 mt-4"
                  onClick={resetItem}
                  style={{ fontSize: "11px", fontWeight: "bold" }}
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
