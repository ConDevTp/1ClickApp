import React from 'react';

const SelectMenu = ({ label, options, value, onChange }) => {
  return (
    <div className="ui-select-wrapper">
      {label && <label className="ui-label">{label}</label>}
      <div className="ui-select-container rtl">
        <select 
          className="ui-select-field" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
        {/* آیکون دوجهته (بالا و پایین) مخصوص دراپ‌داون */}
        <div className="ui-select-arrow">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 4L5 2L7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6L5 8L7 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectMenu;