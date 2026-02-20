import React from 'react';

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="ui-toggle-wrapper" onClick={() => onChange(!checked)}>
      {label && <span className="ui-label m-0">{label}</span>}
      <div className={`ui-toggle-track ${checked ? 'active' : ''}`}>
        <div className="ui-toggle-thumb" />
      </div>
    </div>
  );
};

export default ToggleSwitch;