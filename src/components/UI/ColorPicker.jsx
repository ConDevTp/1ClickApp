import React, { useState, useEffect, useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const CustomColorPicker = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const [color, setColor] = useColor(value || "rgba(0, 122, 255, 1)");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor.hex);
    }
  };

  return (
    <div className="ui-color-wrapper">
      {label && <label className="ui-label">{label}</label>}
      <div className="ui-color-container">
        <div 
          className="ui-color-swatch" 
          style={{ backgroundColor: color.hex }} 
          onClick={() => setIsOpen(!isOpen)}
        />
        <input 
          type="text" 
          className="ui-color-input" 
          value={color.hex} 
          onChange={(e) => handleColorChange(e.target.value)}
          spellCheck="false"
        />
        
        {isOpen && (
          <div className="ui-color-popover" ref={popoverRef}>
            <ColorPicker 
              color={color} 
              onChange={handleColorChange} 
              hideInput={["hsv"]}
              hideAlpha={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomColorPicker;