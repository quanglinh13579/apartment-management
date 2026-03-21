import React from 'react';

interface UncheckedIconProps {
  size?: number | string;
  className?: string;
}

const UncheckedIcon: React.FC<UncheckedIconProps> = ({ 
  size = 24, 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="#CED4DA" strokeWidth="2"/>
    </svg>
  );
};

export default UncheckedIcon;
