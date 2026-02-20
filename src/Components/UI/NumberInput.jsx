import React, { useEffect, useRef } from 'react';

const NumberInput = ({ label, value, onChange, min, max, step = 1, unit = "px" }) => {
  const inputRef = useRef(null);

  // هندل کردن اسکرول موس برای تغییر عدد بدون اسکرول شدن صفحه
  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement === inputRef.current) {
        e.preventDefault(); // جلوگیری از اسکرول کل صفحه
        const direction = e.deltaY > 0 ? -1 : 1;
        const newValue = Number(value) + (direction * step);
        
        // چک کردن محدودیت Min و Max
        if (min !== undefined && newValue < min) return;
        if (max !== undefined && newValue > max) return;
        
        onChange(newValue);
      }
    };

    const currentInput = inputRef.current;
    if (currentInput) {
      currentInput.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentInput) {
        currentInput.removeEventListener('wheel', handleWheel);
      }
    };
  }, [value, onChange, step, min, max]);

  return (
    <div className="ui-number-wrapper">
      {label && <label className="ui-label">{label}</label>}
      <div className="ui-number-container">
        <input
          ref={inputRef}
          type="number"
          className="ui-number-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
        />
        {unit && <span className="ui-number-unit">{unit}</span>}
      </div>
    </div>
  );
};

export default NumberInput;