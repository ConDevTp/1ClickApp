import React from 'react';
import IconButton from './IconButton';

const SectionHeader = ({ title, onReset }) => {
  // آیکون ریست ساده
  const ResetIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );

  return (
    <div className="ui-section-header">
      <span className="ui-section-title">{title}</span>
      {onReset && (
        <IconButton 
          icon={ResetIcon} 
          variant="primary" 
          onClick={onReset} 
          title="بازنشانی این بخش"
        />
      )}
    </div>
  );
};

export default SectionHeader;