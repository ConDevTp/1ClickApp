import React from 'react';

const ButtonGroup = ({ options, activeValue, onChange }) => {
  return (
    <div className="ui-button-group">
      {options.map((option) => (
        <button
          key={option.value}
          className={`ui-group-btn ${activeValue === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;