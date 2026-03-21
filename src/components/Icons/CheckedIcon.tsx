import React from 'react';

interface CheckedIconProps {
  size?: number | string;
  className?: string;
}

const CheckedIcon: React.FC<CheckedIconProps> = ({ 
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
      <rect x="2" y="2" width="20" height="20" rx="5.45455" fill="#45B6EB"/>
      <path d="M16.2424 9.08331L10.4091 14.9166L7.75757 12.2651" stroke="white" strokeWidth="1.81818" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CheckedIcon;
