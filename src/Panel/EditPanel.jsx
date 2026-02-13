import { useContext } from "react";
import { PanelContext } from "../Context/Context";
import "./index.css";
import { useAllData } from "../Hooks/useAllData";

const EditPanel = () => {
  const { activeItem, setActiveItem } = useContext(PanelContext);
  const { value, setValue, resetItem, isDirty } = useAllData(activeItem);

  return (
    <section
      className={`Edit-Panel ${activeItem ? "Edit-Panel-Open" : "Edit-Panel-Close"}`}
    >
      {value && Object.keys(value).length > 0 ? (
        <div className="p-4">
          <input
            type="text"
            value={value.title || ""}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <button onClick={() => setActiveItem(null)}>بستن</button>
          {isDirty && (
            <button
              className="btn-reset-small"
              onClick={resetItem}
              style={{ marginTop: "10px", color: "orange" }}
            >
              بازگشت به مقدار اولیه
            </button>
          )}
        </div>
      ) : (
        <h3>داده‌ای پیدا نشد</h3>
      )}
    </section>
  );
};

export default EditPanel;
