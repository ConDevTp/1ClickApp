import React from 'react';

const InputBox = ({ label, value, onChange, placeholder, type = "text", rtl = false }) => {
  return (
    <div className="ui-input-wrapper">
      {label && <label className="ui-label">{label}</label>}
      <input
        type={type}
        className={`ui-input-field ${rtl ? 'rtl' : ''}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck="false"
      />
    </div>
  );
};

export default InputBox;