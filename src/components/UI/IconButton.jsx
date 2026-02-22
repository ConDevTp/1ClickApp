import React from 'react';

const IconButton = ({ icon, onClick, variant = "muted", title = "" }) => {
  return (
    <button 
      className={`ui-icon-btn ui-btn-${variant}`} 
      onClick={onClick}
      title={title} // نمایش متن راهنما هنگام نگه داشتن موس
      type="button"
    >
      {icon}
    </button>
  );
};

export default IconButton;