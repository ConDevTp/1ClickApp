import React, { useContext } from "react";
import { AppContext } from "../Context/SliderContext";

const GlobalPanel = () => {
  const { editor, setEditor, handleUpdate } = useContext(AppContext);
  if (!editor.isOpen) return null;

  const { type, data, activeKey } = editor;

  return (
    <div className="global-panel">
      <button onClick={() => setEditor({ ...editor, isOpen: false })}>
        Close
      </button>
      {Object.keys(data).map((field) => (
        <input
          key={field}
          value={data[field] || ""}
          onChange={(e) =>
            handleUpdate(type.toLowerCase(), activeKey, field, e.target.value)
          }
        />
      ))}
    </div>
  );
};

export default GlobalPanel;
