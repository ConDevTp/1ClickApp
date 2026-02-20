import React from 'react';

const CompactSlider = ({ label, min = 0, max = 100, step = 1, value, onChange, unit = "" }) => {
  return (
    <div className="cp-slider-container">
      <div className="cp-slider-header">
        {label && <label className="ui-label m-0">{label}</label>}
        <span className="cp-slider-badge">{value}{unit}</span>
      </div>
      <input
        type="range"
        className="cp-slider-field mt-2"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CompactSlider;